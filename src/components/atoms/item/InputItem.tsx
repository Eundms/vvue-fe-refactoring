import { useState } from 'react';
import FontSelector from '../fontSelector/FontSelector';
import { GenderType } from 'app/user/profile/page';

export type inputType = 'INPUT' | 'REPEAT' | 'GENDER';

interface InputItemProps {
  nowRepeat?: any;
  gender?: GenderType;
  handleChooseNo?: (e: any) => void;
  handleChooseMonthly?: (e: any) => void;
  handleChooseAnnual?: (e: any) => void;
  handleChooseMale?: (e: any) => void;
  handleChooseFemale?: (e: any) => void;
  inputType: inputType;
  onChange?: any;
  children: React.ReactNode;
  scheduleName?: string;
  value?: string;
}

export const InputItem = (props: InputItemProps) => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-2 px-2 py-4 bg-white'>
      <div className='w-full flex flex-col justify-center gap-2'>
        <FontSelector fontInfo='jua-regular-16px'>{props.children}</FontSelector>
      </div>
      {props.inputType === 'INPUT' ? (
        <div className='w-full'>
          <FontSelector fontInfo='pretendard-regular-md'>
            <input
              value={props.value}
              onChange={props.onChange}
              className='w-full rounded-lg bg-[#E5F0FF] text-[#757575] items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF]'
              style={{ color: '#757575' }}
            />
          </FontSelector>
        </div>
      ) : props.inputType === 'REPEAT' ? (
        <div className='w-full flex justify-between text-[#424242]'>
          {props.nowRepeat === 'NONREPEAT' ? (
            <button
              className='bg-[#B7D5FF] rounded-[8px] h-[31px] w-1/4'
              onClick={props.handleChooseNo}
            >
              <FontSelector fontInfo='pretendard-regular-md'>
                반복 없음
              </FontSelector>
            </button>
          ) : (
            <button
              className='border border-[#B7D5FF] rounded-[8px] h-[31px] w-1/4'
              onClick={props.handleChooseNo}
            >
              <FontSelector fontInfo='pretendard-regular-md'>
                반복 없음
              </FontSelector>
            </button>
          )}
          {props.nowRepeat === 'MONTHLY' ? (
            <button
              className='bg-[#B7D5FF] rounded-[8px] h-[31px] w-1/4'
              onClick={props.handleChooseMonthly}
            >
              <FontSelector fontInfo='pretendard-regular-md'>
                매달 반복
              </FontSelector>
            </button>
          ) : (
            <button
              className='border border-[#B7D5FF] rounded-[8px] h-[31px] w-1/4'
              onClick={props.handleChooseMonthly}
            >
              <FontSelector fontInfo='pretendard-regular-md'>
                매달 반복
              </FontSelector>
            </button>
          )}
          {props.nowRepeat === 'YEARLY' ? (
            <button
              className='bg-[#B7D5FF] rounded-[8px] h-[31px] w-1/4'
              onClick={props.handleChooseAnnual}
            >
              <FontSelector fontInfo='pretendard-regular-md'>
                매년 반복
              </FontSelector>
            </button>
          ) : (
            <button
              className='border border-[#B7D5FF] rounded-[8px] h-[31px] w-1/4'
              onClick={props.handleChooseAnnual}
            >
              <FontSelector fontInfo='pretendard-regular-md'>
                매년 반복
              </FontSelector>
            </button>
          )}
        </div>
      ) : props.inputType === 'GENDER' ? (
        <div className='w-full h-10 flex justify-between text-[#424242] gap-2'>
          {props.gender === 'MALE' ? (
            <button className=' bg-navy-50 rounded-[8px] flex-1' onClick={props.handleChooseMale}>
              <FontSelector fontInfo='pretendard-regular-14px'>남자</FontSelector>
            </button>
          ) : (
            <button
              className='border border-navy-50 rounded-[8px] flex-1'
              onClick={props.handleChooseMale}
            >
              <FontSelector fontInfo='pretendard-regular-14px'>남자</FontSelector>
            </button>
          )}
          {props.gender === 'FEMALE' ? (
            <button className='bg-navy-50 rounded-[8px] flex-1' onClick={props.handleChooseFemale}>
              <FontSelector fontInfo='pretendard-regular-14px'>여자</FontSelector>
            </button>
          ) : (
            <button
              className='border border-navy-50 rounded-[8px] flex-1'
              onClick={props.handleChooseFemale}
            >
              <FontSelector fontInfo='pretendard-regular-14px'>여자</FontSelector>
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
