'use client';

import React, { useEffect, useState } from 'react';
import { InputItem } from '@components/atoms/item/InputItem';
import { DateItem } from '@components/atoms/item/DateItem';
import { BottomButton } from '@components/atoms/button/BottomButton';
import moment from 'moment';
import { getUserInfoApi } from 'apis/userApi';
import { createScheduleApi, NewScheduleProps } from 'apis/schedulesApi';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

export default function DDayCreate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 일정명 입력 값
  const [inputValue, setInputValue] = useState<string>('');
  // 날짜 입력 값
  const [value, setValue] = useState(searchParams.get('date')??new Date());
  const selectedDate = moment(value).format('YYYY-MM-DD');
  // 반복 유무 입력 값
  const [nowRepeat, setNowRepeat] = useState('');

  // 일정명 입력 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 날짜 선택 합수
  function handleDateChange(date: Date) {
    setValue(date);
  }

  // 반복 유무 입력 합수
  // 반복 없음
  const handleChooseNo = () => {
    setNowRepeat('NONREPEAT');
    console.log('NONREPEAT');
  };

  // 매달 반복
  const handleChooseMonthly = () => {
    setNowRepeat('MONTHLY');
    console.log('MONTHLY');
  };

  // 매년 반복
  const handleChooseAnnual = () => {
    setNowRepeat('YEARLY');
    console.log('YEARLY');
  };

  const successNotify = () => toast('일정 등록이 완료되었습니다.');
  const failNotify = () => toast('일정 등록에 실패했습니다.');

  // 입력 값 저장
  const handleSaveInput = async () => {
    const data: NewScheduleProps = {
      repeatCycle: nowRepeat,
      scheduleDate: selectedDate,
      scheduleName: inputValue,
    };
    console.log(data);

    const response = await createScheduleApi(data);
    if (response.status === 200) {
      successNotify();
      console.log('일정 저장 완료', response);
      console.log('Save');
      // 뒤로 가기
      router.back();
      history.pushState({}, '', pathname);
    } else {
      failNotify();
    }
  };

  return (
    <div>
      <div className='mx-[8px]'>
        <InputItem onChange={handleInputChange} inputType='INPUT'>
          일정명
        </InputItem>

        <DateItem value={value} handleDateChange={handleDateChange}>
          날짜
        </DateItem>

        <InputItem
          nowRepeat={nowRepeat}
          handleChooseNo={handleChooseNo}
          handleChooseMonthly={handleChooseMonthly}
          handleChooseAnnual={handleChooseAnnual}
          inputType='REPEAT'
        >
          반복 유무
        </InputItem>
      </div>

      <BottomButton onClick={handleSaveInput} label='저장하기' />
    </div>
  );
}
