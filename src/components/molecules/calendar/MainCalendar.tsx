'use client';

import React, { useEffect, useState } from 'react';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
// pnpm add react-calendar
import Calendar from 'react-calendar';
// pnpm add moment
import moment from 'moment';
// css 적용
// import 'react-calendar/dist/Calendar.css';
import '@components/molecules/calendar/MainCalendar.css';
import { ScheduleProps, getMonthScheduleApi } from 'apis/schedulesApi';
import { getCalendarDailyApi } from 'apis/schedulesApi';

export type bottomType = 'YES' | 'NO';

interface IMainCalendarProps {
  isProfile?: boolean;
  bottomType: bottomType;
  value: any;
  handleDateChange: any;
}

export default function MainCalendar({
  bottomType,
  value,
  handleDateChange,
  isProfile,
}: IMainCalendarProps) {
  const selectedDate = moment(value).format('YYYY년 MM월 DD일');

  // 특정 달에 일정이 있는 날을 조회하기 위해
  // 달력을 이동할 때마다 년과 월을 구함
  const monthOfActiveMonth = moment(value).format('MM');
  const monthOfActiveYear = moment(value).format('YYYY');
  const [activeMonth, setActiveMonth] = useState(monthOfActiveMonth);
  const [activeYear, setActiveYear] = useState(monthOfActiveYear);

  const getActiveMonthYear = (activeStartDate: moment.MomentInput) => {
    const newActiveMonth = moment(activeStartDate).format('MM');
    setActiveMonth(newActiveMonth);
    const newActiveYear = moment(activeStartDate).format('YYYY');
    setActiveYear(newActiveYear);
  };

  const [monthList, setMonthList] = useState([]);
  useEffect(() => {
    const month = Number(activeMonth);
    const year = Number(activeYear);

    const getMonthSchedule = async () => {
      const response = await getMonthScheduleApi(month, year);
      await setMonthList(response);
    };
    !isProfile && getMonthSchedule();
  }, [activeMonth, activeYear]);

  return (
    <div>
      <Calendar
        onActiveStartDateChange={({ activeStartDate }) => getActiveMonthYear(activeStartDate)}
        locale='ko'
        calendarType='gregory'
        className='mx-auto w-full text-sm'
        onChange={handleDateChange}
        value={value}
        // 다음 연도 화살표
        next2Label={null}
        // 이전 연도 화살표
        prev2Label={null}
        // 바로 근접해있는 이전 또는 다음 달의 날짜 보이지 않기
        showNeighboringMonth={false}
        formatDay={(locale: any, date: any) => moment(date).format('DD')}
        tileContent={({ date, view }: any) => {
          if (
            bottomType === 'NO' &&
            monthList &&
            monthList.find((x) => x === moment(date).format('YYYY-MM-DD'))
          ) {
            return (
              <div className='flex justify-center items-center absoluteDiv'>
                <div className='fix-dot'></div>
              </div>
            );
            // } else if (monthList.find((x) => x.date === moment(date).format('YYYY-MM-DD'))) {
            //   return (
            //     <div className='flex justify-center items-center absoluteDiv'>
            //       <div className='plan-dot'></div>
            //     </div>
            //   );
          } else {
            return (
              <div className='flex justify-center items-center absoluteDiv'>
                <div className='no-plan-dot'></div>
              </div>
            );
          }
        }}
      />
      {bottomType === 'NO' ? (
        <div className='text-[#424242] ps-[16px] py-[16px] border-b border-b-[#9E9E9E]'>
          <FontSelector fontInfo='pretendard-bold-md'>{selectedDate}</FontSelector>
        </div>
      ) : null}
    </div>
  );
}
