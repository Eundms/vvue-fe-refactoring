'use client';

import React, { useEffect, useState } from 'react';
import moment from "moment-timezone";
import MainCalendar from '@components/molecules/calendar/MainCalendar';
import { ScheduleItem } from '@components/atoms/item/ScheduleItem';
import { PlanTitleText } from '@components/atoms/text/PlanTitleText';
import { PlanPlaceText } from '@components/atoms/text/PlanPlaceText';
import Link from 'next/link';
import AddButton from '@components/atoms/iconButtons/AddButton';
import { ScheduleTotalProps, getCalendarDailyApi } from 'apis/schedulesApi';
import CalendarScheduleList from '@components/molecules/scheduleList/CalendarScheduleList';
import { useSetAtom } from 'jotai';
import { ScheduleAtom } from 'stores/schedule';
import Loading from '@components/atoms/loading/Loading';

export default function Calendar() {
  // useState를 사용하기 위해선 'use client' 작성해야 함
  const [isLoading, setIsLoading] = useState(true);
  
  const [value, setValue] = useState(new Date());
  const [nowScheduleList, setNowScheduleList] = useState<ScheduleTotalProps[]>([]);
  const selectedDate = moment(value).tz("Asia/Seoul").format('YYYY-MM-DD');
  const setScheduleMemory = useSetAtom(ScheduleAtom);
  setScheduleMemory(selectedDate);

  const handleDateChange = (date: Date) => {
    setValue(date);
  };

  useEffect(() => {
    const getCalendarDaily = async () => {
      try {
        const response: any = await getCalendarDailyApi(selectedDate);
        await console.log('우하하하: ', response);
        await setNowScheduleList(response);
      } catch (error) {
        console.error('데일리 목록 가져오는 중 오류 발생');
      } finally {
        setIsLoading(false);
      }
    };
    
    getCalendarDaily();
  }, [selectedDate]);

  const goToCreate = () => {
    console.log('Create new plan');
  };

  return (
    <>
      <MainCalendar
        bottomType='NO'
        value={value}
        handleDateChange={handleDateChange}
      ></MainCalendar>
      {isLoading ? (<Loading />)
      : <CalendarScheduleList>
          {nowScheduleList &&
            nowScheduleList.map((fix: ScheduleTotalProps, idx: number) => {
              if (
                selectedDate === fix.scheduleResDto.curDate &&
                fix.scheduleResDto.dateType !== 'NORMAL'
              ) {
                const fixDate = moment(fix.scheduleResDto.curDate, 'YYYY-MM-DD');
                const today = moment().format('YYYY-MM-DD');
                const currentDate = moment(today, 'YYYY-MM-DD');
                const scheduleId = fix.scheduleResDto.id;
                return (
                  <ScheduleItem
                    key={idx}
                    itemType='NOTNORMAL'
                    calendarType='CALENDAR'
                    calendarPlan={fix}
                    scheduleId={scheduleId}
                    scheduleName={fix.scheduleResDto.scheduleName}
                    scheduleDate={fix.scheduleResDto.curDate}
                  >
                    <PlanTitleText>{fix && fix.scheduleResDto.scheduleName}</PlanTitleText>
                    <PlanPlaceText>{fixDate.format('YYYY-MM-DD')}</PlanPlaceText>
                  </ScheduleItem>
                );
              }
              return null;
            })}
          {nowScheduleList &&
            nowScheduleList.map((plan: ScheduleTotalProps, idx: number) => {
              if (
                selectedDate === plan.scheduleResDto.curDate &&
                plan.scheduleResDto.dateType === 'NORMAL'
              ) {
                const planDate = moment(plan.scheduleResDto.curDate, 'YYYY-MM-DD');
                const today = moment().tz("Asia/Seoul").format('YYYY-MM-DD');
                const currentDate = moment(today, 'YYYY-MM-DD');
                const scheduleId = plan.scheduleResDto.id;
                return (
                  <ScheduleItem
                    key={idx}
                    itemType='NORMAL'
                    calendarType='CALENDAR'
                    calendarPlan={plan}
                    scheduleId={scheduleId}
                    scheduleName={plan.scheduleResDto.scheduleName}
                    scheduleDate={plan.scheduleResDto.curDate}
                  >
                    <PlanTitleText>{plan && plan.scheduleResDto.scheduleName}</PlanTitleText>
                    <PlanPlaceText>{planDate.format('YYYY-MM-DD')}</PlanPlaceText>
                  </ScheduleItem>
                );
              }
              return null;
            })}
      </CalendarScheduleList>}
      <div className='absolute bottom-20 right-2'>
        <Link href={{
          pathname: '/d-day/create',
          query: { date: selectedDate },
        }}>
          <AddButton onClick={goToCreate} size={45} />
        </Link>
      </div>
    </>
  );
}
