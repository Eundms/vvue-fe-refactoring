'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ScheduleItem } from '@components/atoms/item/ScheduleItem';
import { PlanTitleText } from '@components/atoms/text/PlanTitleText';
import { PlanPlaceText } from '@components/atoms/text/PlanPlaceText';
import { GetDdayScheduleProps, ScheduleProps, getAllScheduleApi } from 'apis/schedulesApi';
// import { getUserInfoApi } from 'apis/userApi';

const DDayScheduleList = () => {
  // const [userId, setUserId] = useState()
  // useEffect(() => {
  //   const getUserId =async () => {
  //     const response: any = await getUserInfoApi()
  //     await setUserId(response.data.id)
  //     await console.log('ID 획득^^', response.data.id)
  //   }
  //   getUserId()
  // }, [])

  const idCursor = -1;
  const size = 20;
  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>();
  useEffect(() => {
    const getAllSchedules = async () => {
      const response = await getAllScheduleApi(idCursor, size);
      response.data.scheduleResDtoList && setScheduleList(response.data.scheduleResDtoList);
      console.log('일정 목록^^', response.data.scheduleResDtoList);
    };
    getAllSchedules();
  }, []);

  return (
      <div className='vvue-scroll h-full'>
        <div>
          {scheduleList?.map((fix: ScheduleProps, idx: number) => {
            if (fix.dateType !== 'NORMAL') {
              const fixDate = moment(fix.curDate, 'YYYY-MM-DD');
              const today = moment().format('YYYY-MM-DD');
              const currentDate = moment(today, 'YYYY-MM-DD');
              const scheduleId = fix.id;
              if (fixDate.isSame(currentDate) || fixDate.isAfter(currentDate)) {
                return (
                  <ScheduleItem
                    key={idx}
                    itemType='NOTNORMAL'
                    calendarType='DDAY'
                    ddayFix={fix}
                    scheduleId={scheduleId}
                  >
                    <PlanTitleText>{fix && fix.scheduleName}</PlanTitleText>
                    <PlanPlaceText>{fixDate.format('YYYY-MM-DD')}</PlanPlaceText>
                  </ScheduleItem>
                );
              }
            }
            return null;
          })}
        </div>
        <div>
          {scheduleList?.map((plan: ScheduleProps, idx: number) => {
            if (plan.dateType === 'NORMAL') {
              const planDate = moment(plan.curDate, 'YYYY-MM-DD');
              const today = moment().format('YYYY-MM-DD');
              const currentDate = moment(today, 'YYYY-MM-DD');
              const scheduleId = plan.id;
              if (planDate.isSame(currentDate) || planDate.isAfter(currentDate)) {
                return (
                  <ScheduleItem
                    key={idx}
                    itemType='NORMAL'
                    calendarType='DDAY'
                    ddayPlan={plan}
                    scheduleId={scheduleId}
                  >
                    <PlanTitleText>{plan && plan.scheduleName}</PlanTitleText>
                    <PlanPlaceText>{planDate.format('YYYY-MM-DD')}</PlanPlaceText>
                  </ScheduleItem>
                );
              }
            }
            return null;
          })}
        </div>
      </div>
  );
};

export default DDayScheduleList;
