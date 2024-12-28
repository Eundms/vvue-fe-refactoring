// 각 일정의 수정 페이지
'use client';

import React, { useEffect, useState } from 'react';
import { InputItem } from '@components/atoms/item/InputItem';
import { DateItem } from '@components/atoms/item/DateItem';
import { BottomButton } from '@components/atoms/button/BottomButton';
import moment from 'moment';
import { usePathname, useRouter } from 'next/navigation';
import { getEachScheduleApi } from 'apis/schedulesApi';
import { updateScheduleApi, NewScheduleProps } from 'apis/schedulesApi';

export default function DDayCreate() {
  // 일정명 입력 값
  const [inputValue, setInputValue] = useState<string>('');
  // 날짜 입력 값
  const [value, setValue] = useState(moment(new Date()).format('YYYY-MM-DD'));
  // 반복 유무 입력 값
  const [nowRepeat, setNowRepeat] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const scheduleId = Number(id);

  useEffect(() => {
    console.log('scheduleId: ', scheduleId);
    const fetchData = async (scheduleId: number) => {
      const response = await getEachScheduleApi(scheduleId);
      console.log(response);
      setInputValue(response.scheduleName);
      setValue(response.curDate);
      setNowRepeat(response.repeatCycle);
    };

    fetchData(scheduleId);
  }, []);

  // 일정명 입력 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 날짜 선택 합수
  function handleDateChange(date: Date) {
    setValue(moment(date).format('YYYY-MM-DD'));
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

  // 입력 값 수정
  const handleSaveInput = async () => {
    const data: NewScheduleProps = {
      repeatCycle: nowRepeat,
      scheduleDate: value,
      scheduleName: inputValue,
    };
    console.log('data: ', data);

    const response = await updateScheduleApi(scheduleId, data);
    console.log('일정 변경 완료^^', response);
    console.log('Update');
    // 뒤로 가기
    router.back();
    history.pushState({}, '', pathname);
  };

  return (
    <div>
      <div className='mx-[8px]'>
        <InputItem value={inputValue} onChange={handleInputChange} inputType='INPUT'>
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

      <BottomButton onClick={handleSaveInput} label='수정하기' />
    </div>
  );
}
