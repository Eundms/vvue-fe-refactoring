import React from 'react';
import HeartIcon from 'assets/HeartIcon.png';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import { useAtomValue } from 'jotai';
import { marriedDateAtom, myInfoAtom, spouseInfoAtom } from 'stores/marriedUserStore';
import { calculateDays } from 'utils/calculateDays';
import moment from 'moment';
import { cls } from 'utils/cls';
import Image from 'next/image';

const MainUserInfoWrapper = () => {
  const marriedInfo = useAtomValue(marriedDateAtom);
  const myInfo = useAtomValue(myInfoAtom);
  const spouseInfo = useAtomValue(spouseInfoAtom);

  const today = moment().format('YYYY-MM-DD');
  const currentDate = moment(today, 'YYYY-MM-DD');
  const dDay = calculateDays(marriedInfo, currentDate);
  const dDayOfYear = isNaN(Math.floor(parseInt(dDay) / 365))
    ? '0'
    : Math.floor(parseInt(dDay) / 365) + 1;
  return (
    <>
      <div
        className={cls(
          'text-center w-full top-20 z-30 absolute left-1/2 transform -translate-x-1/2'
        )}
      >
        <FontSelector fontInfo='jua-regular-sm'>{marriedInfo}</FontSelector>
        <div className={cls('text-2xl mt-4')}>
          <div className='flex items-center justify-center gap-2'>
            <div
              className='flex items-center justify-end'
              style={{
                flex: `0 0 ${Math.min(myInfo.nickname.length, spouseInfo.nickname.length) * 50}px`,
              }}
            >
              <FontSelector fontInfo='jua-regular'>{myInfo.nickname}</FontSelector>
            </div>
            <div className='flex items-center'>
              <Image src={HeartIcon} alt='하트 아이콘' width='40' height='40' />
            </div>
            <div
              className='flex  items-center justify-start'
              style={{
                flex: `0 0 ${Math.min(myInfo.nickname.length, spouseInfo.nickname.length) * 50}px`,
              }}
            >
              <FontSelector fontInfo='jua-regular'>{spouseInfo.nickname}</FontSelector>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
        <FontSelector fontInfo='jua-regular-sm'>{dDayOfYear}주년</FontSelector>
        <div className={cls('text-4xl mt-1')}>
          <FontSelector fontInfo='jua-regular-4xl'>
            {dDay}
            {dDay !== 'D-day' && '일'}
          </FontSelector>
        </div>
      </div>
    </>
  );
};

export default MainUserInfoWrapper;
