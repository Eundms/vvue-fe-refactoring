'use client';
import React, { Dispatch, useEffect, useState } from 'react';
import CopyButton from '../iconButtons/CopyButton';
import ReissueButton from '../iconButtons/ReissueButton';
import { cls } from 'utils/cls';
import FontSelector from '../fontSelector/FontSelector';
import { createMarriedCodeApi, getReMarriedCodeApi } from 'apis/marriedCodeApi';

interface ICodeIconInputProps {
  inputValue?: string;
  inputValueSet?: Dispatch<React.SetStateAction<string>> | undefined;
  inputType?: LABEL_TYPE;
  onInputChange?: (value: string) => void;
}

// export interface CreateMarriedCodeProps {
//   marriedCode: 'string';
// }

export type LABEL_TYPE = 'MINE';

const CodeIconInput = ({
  inputValue,
  inputValueSet,
  inputType,
  onInputChange,
}: ICodeIconInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onInputChange) {
      onInputChange(newValue);
    }
  };

  if (inputType === 'MINE' && inputValueSet) {
    useEffect(() => {
      const handleGetMarriedCode = async () => {
        const data = await createMarriedCodeApi();
        inputValueSet(data.marriedCode);
      };
      handleGetMarriedCode();
    }, []);
  }

  const handleCopyCode = () => {
    console.log('Input Value:', inputValue);
    navigator.clipboard.writeText(inputValue || '');
  };

  const handleReissue = async () => {
    console.log('Input Value:', inputValue);
    // 재발급하는 코드 호출
    const data = await getReMarriedCodeApi({ marriedCode: inputValue });
    if (inputType === 'MINE' && inputValueSet) {
      inputValueSet(data.marriedCode);
    }
  };

  return (
    <div className={cls('pt-4')}>
      <FontSelector fontInfo='jua-regular-sm'>
        {inputType === 'MINE' ? '내 초대코드' : '상대방 초대코드'}
      </FontSelector>
      <div className={cls('relative w-full flex justify-center items-center')}>
        <input
          value={inputValue}
          disabled={inputType === 'MINE'}
          onChange={handleInputChange}
          className='w-full flex flex-col rounded-lg bg-[#E5F0FF] text-[#757575] justify-center items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF] pr-7'
        />
        {inputType === 'MINE' && (
          <div className='absolute right-2 grid grid-cols-2 gap-2'>
            <CopyButton onClick={handleCopyCode} />
            <ReissueButton onClick={handleReissue} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeIconInput;
