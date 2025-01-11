'use client';

import React, { useEffect, useState } from 'react';
import moment from "moment-timezone";
// D-day 계산하는 함수
import { calculateDays } from 'utils/calculateDays';
import { IoDocumentTextOutline, IoRepeat } from 'react-icons/io5';
import { IoCreateOutline } from 'react-icons/io5';
import { IoTrashOutline } from 'react-icons/io5';
import { useLongPress } from 'use-long-press';
import FontSelector from '../fontSelector/FontSelector';
import { useRouter } from 'next/navigation';
import ModalWithButtons from '@components/organisms/modalWithButtons/ModalWithButtons';
import { ScheduleProps, ScheduleTotalProps } from 'apis/schedulesApi';

// 고정 일정 또는 새로 계획한 일정
export type itemType = 'NORMAL' | 'NOTNORMAL';
// 달력 페이지 또는 디데이 페이지
export type calendarType = 'CALENDAR' | 'DDAY';

interface ScheduleItemProps {
  itemType: itemType;
  calendarType: calendarType;
  calendarFix?: ScheduleTotalProps;
  ddayFix?: ScheduleProps;
  calendarPlan?: ScheduleTotalProps;
  ddayPlan?: ScheduleProps;
  scheduleId?: number | undefined;
  children: React.ReactNode;
}

export const ScheduleItem = ({
  itemType,
  calendarType,
  calendarFix,
  calendarPlan,
  ddayFix,
  ddayPlan,
  scheduleId,
  children,
}: ScheduleItemProps) => {
  const fixTargetDate =
    calendarType === 'CALENDAR'
      ? moment(calendarFix?.scheduleResDto.curDate, 'YYYY-MM-DD')
      : moment(ddayFix?.curDate, 'YYYY-MM-DD');
  const planTargetDate =
    calendarType === 'CALENDAR'
      ? moment(calendarPlan?.scheduleResDto.curDate, 'YYYY-MM-DD')
      : moment(ddayPlan?.curDate, 'YYYY-MM-DD');
  const today = moment().tz("Asia/Seoul").format('YYYY-MM-DD');
  const currentDate = moment(today, 'YYYY-MM-DD');
  const dDayOfFixed = calculateDays(
    fixTargetDate,
    currentDate,
    calendarType === 'CALENDAR' ? calendarFix : ddayFix
  );
  const dDayOfPlanned = calculateDays(
    planTargetDate,
    currentDate,
    calendarType === 'CALENDAR' ? calendarPlan : ddayPlan
  );
  const calendarSchedule = calendarPlan || calendarFix;
  const ddaySchedule = ddayFix || ddayPlan;

  // 일정을 꾹 눌렀을 때 수정/삭제 버튼이 뜨도록 만들기 위한 변수와 함수
  const [enabled, setEnabled] = React.useState(true);
  const [longPressed, setLongPressed] = React.useState(false);
  const [openButton, setOpenButton] = React.useState('No');
  const [openStatus, setOpenStatus] = useState(false);
  const [openDeleteStatus, setOpenDeleteStatus] = useState(false);

  const callback = React.useCallback(() => {
    setLongPressed(true);
  }, []);

  const bind = useLongPress(enabled ? callback : null, {
    onFinish: (event: any, meta: any) => {
      setLongPressed(false);
      setOpenStatus(false);
      setTimeout(() => setOpenButton('Yes'), 400);
      console.log('Open Button', meta);
    },
  });

  // 원하는 위치에 수정/삭제 버튼이 뜨도록 하는 변수와 함수
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // const handleMouseMove = (event: any) => {
  //   setMousePosition({ x: event.clientX, y: event.clientY });
  // };
  // useEffect(() => {
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);
  // const leftPosition = mousePosition.x - 20;

  // 수정 버튼 눌렀을 때
  const router = useRouter();
  const clickUpdate = () => {
    setOpenButton('No');
    router.push(`/d-day/${scheduleId}`);
    console.log('Update');
  };

  // 삭제 버튼 눌렀을 때
  const clickDelete = () => {
    console.log('Delete');
    setOpenButton('No');
    setOpenStatus(true);
  };

  // 닫기 버튼 눌렀을 때
  const clickClose = () => {
    setOpenButton('No');
    console.log('Close');
  };

  const deleteSchedule = async () => {
    await setOpenDeleteStatus(false);
    await console.log('Delete Schedule');
    await setOpenDeleteStatus(true);
  };

  const clickSchedule = () => {
    router.push(`/d-day/${scheduleId}`);
    console.log('Update');
  };

  return (
    <>
      {calendarType === 'CALENDAR' ? (
        <div>
          {moment(calendarSchedule?.scheduleResDto.curDate, 'YYYY-MM-DD').isBefore(currentDate) ? (
            <div className='p-[16px] border-b border-b-[#9E9E9E] flex justify-between static'>
              <div className='flex'>
                <div>
                  {itemType !== 'NORMAL' ? (
                    <div className='me-[16px] bg-[#006BFF] w-[3px] h-[28px] rounded-[8px] inline-block'></div>
                  ) : (
                    <div className='me-[16px] bg-[#FFB300] w-[3px] h-[28px] rounded-[8px] inline-block'></div>
                  )}
                </div>
                <div className='inline-block'>{children}</div>
              </div>
              <div className='inline-block ps-[4px]'>
                <div className='w-[68px]'>
                  {calendarSchedule?.wroteMemory && calendarSchedule?.memoryId ? (
                    <button
                      onClick={() => router.push(`/memory/${calendarSchedule?.memoryId}`)}
                      className='inline-block bg-[#5CA0FF] text-[20px] text-white ps-[6px] pb-[6px] pe-[4px] pt-[4px] rounded-[8px] hover:bg-[#006BFF] hover:cursor-pointer'
                    >
                      <IoDocumentTextOutline />
                    </button>
                  ) : (
                    <button
                      onClick={() => router.push(`/memory/create?scheduleId=${scheduleId}`)}
                      className='inline-block bg-[#5CA0FF] text-[20px] text-white ps-[6px] pb-[6px] pe-[4px] pt-[4px] rounded-[8px] hover:bg-[#006BFF] hover:cursor-pointer'
                    >
                      <IoCreateOutline />
                    </button>
                  )}
                  <button
                    onClick={deleteSchedule}
                    className='inline-block bg-[#FF6D6D] text-[20px] text-white p-[5px] ms-[8px] rounded-[8px] hover:bg-[#FF4343] hover:cursor-pointer'
                  >
                    <IoTrashOutline />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={clickSchedule}
              className='p-[16px] border-b border-b-[#9E9E9E] flex justify-between static cursor-pointer hover:bg-gray-100'
            >
              <div className='flex'>
                <div>
                  {itemType !== 'NORMAL' ? (
                    <div className='me-[16px] bg-[#006BFF] w-[3px] h-[28px] rounded-[8px] inline-block'></div>
                  ) : (
                    <div className='me-[16px] bg-[#FFB300] w-[3px] h-[28px] rounded-[8px] inline-block'></div>
                  )}
                </div>
                <div className='inline-block'>{children}</div>
              </div>
              <div className='inline-block ps-[4px]'>
                {calendarSchedule?.scheduleResDto.repeatCycle !== 'NONREPEAT' ? (
                  <div className='text-[24px]'>
                    <IoRepeat />
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className='p-[16px] border-b border-b-[#9E9E9E] flex justify-between static'
          {...bind()}
        >
          <div className='flex'>
            <div>
              {itemType !== 'NORMAL' ? (
                <div className='me-[16px] bg-[#006BFF] w-[3px] h-[28px] rounded-[8px] inline-block'></div>
              ) : (
                <div className='me-[16px] bg-[#FFB300] w-[3px] h-[28px] rounded-[8px] inline-block'></div>
              )}
            </div>
            <div className='inline-block'>{children}</div>
          </div>
          <div className='inline-block ps-[4px]'>
            {/* 디데이 페이지 & (고정 일정 or 새로 작성한 일정) => 남은 날짜 */}
            {itemType !== 'NORMAL' ? (
              <div className='text-2xl font-semibold w-[92px] text-end'>{dDayOfFixed}</div>
            ) : itemType === 'NORMAL' ? (
              <div className='text-2xl font-semibold w-[92px] text-end'>{dDayOfPlanned}</div>
            ) : null}
          </div>
          {openButton === 'Yes' ? (
            <div
              className='z-20 absolute bg-gray-50 border border-gray-500 rounded-[8px]'
              // style={{ left: `${leftPosition}px` }}
              style={{
                left: '50%',
                transform: 'translate(-50%, 0%)', // 가운데 정렬을 위한 transform 속성 추가
              }}
            >
              <FontSelector fontInfo='pretendard-regular-lg'>
                <div>
                  <button
                    onClick={clickUpdate}
                    className='w-[85px] h-[46px] border-b border-gray-500 rounded-t-[8px] hover:bg-gray-200'
                  >
                    수정
                  </button>
                </div>
                <div>
                  {itemType === 'NORMAL' ? (
                    <button
                      onClick={clickDelete}
                      className='w-[85px] h-[46px] border-b border-gray-500 hover:bg-gray-200'
                    >
                      삭제
                    </button>
                  ) : null}
                </div>
                <div>
                  <button
                    onClick={clickClose}
                    className='w-[85px] h-[46px] rounded-b-[8px] hover:bg-gray-200'
                  >
                    닫기
                  </button>
                </div>
              </FontSelector>
            </div>
          ) : null}
        </div>
      )}
      {/* 삭제 눌렀을 때 뜨는 모달창들 */}
      {openStatus === true ? (
        <ModalWithButtons pageType='DDAY' openModal={openStatus} scheduleId={scheduleId}>
          <div>예정된 일정을</div>
          <div>삭제하시겠습니까?</div>
        </ModalWithButtons>
      ) : null}
      {openDeleteStatus === true ? (
        <ModalWithButtons pageType='DDAY' openModal={openDeleteStatus} scheduleId={scheduleId}>
          <div>해당 일정과 추억을 함께</div>
          <div>삭제하시겠습니까?</div>
        </ModalWithButtons>
      ) : null}
    </>
  );
};
