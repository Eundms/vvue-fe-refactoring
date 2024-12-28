import React, { useEffect, useState } from 'react';
import moment from 'moment';
import FontSelector from '../fontSelector/FontSelector';
import MainCalendar from '@components/molecules/calendar/MainCalendar';
import useBottomSheet from 'utils/useBottomSheet';
import { IoCalendarClearOutline } from 'react-icons/io5';
// import { ScheduleAtom } from 'stores/schedule';
// import { useAtomValue } from 'jotai';

interface DateItemProps {
  isProfile?: boolean;
  children: React.ReactNode;
  value: any;
  handleDateChange: (e: any) => void;
}

// 날짜 선택하는 컴포넌트
// children을 통해 제목 변경 가능
export const DateItem = (props: DateItemProps) => {
  const { component, openPopup, closePopup, isOpen } = useBottomSheet();
  // const scheduleMemory = useAtomValue(ScheduleAtom)
  // const [choice, setChoice] = useState(scheduleMemory)
  const selectedDate = moment(props.value).format('YYYY-MM-DD');

  const clickDate = (date: Date) => {
    props.handleDateChange(date);
    console.log('Click date');
    closePopup();
  };


  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-2 px-2 py-4 bg-white rounded-lg'>
      <div className='w-full flex flex-col justify-center gap-2'>
        <FontSelector fontInfo='jua-regular-16px'>{props.children}</FontSelector>
      </div>
      <div className='w-full'>
        <button
          className='w-full'
          onClick={() =>
            openPopup(
              <>
                <MainCalendar
                  isProfile={props.isProfile}
                  bottomType='YES'
                  value={props.value}
                  handleDateChange={clickDate}
                ></MainCalendar>
              </>
            )
          }
        >
          <div>
            <div className='flex justify-between rounded-lg bg-[#E5F0FF] text-[#757575] items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF]'>
              <div className='inline-block align-middle'>
                <FontSelector fontInfo='pretendard-regular-14px]'>{selectedDate}</FontSelector>
              </div>
              <div className='text-[24px] inline-block align-middle'>
                <IoCalendarClearOutline />
              </div>
            </div>
          </div>
        </button>
        {component}
      </div>
    </div>
  );
};
