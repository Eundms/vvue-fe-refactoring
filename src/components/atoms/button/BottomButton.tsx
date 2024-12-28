import React from 'react';
import { cls } from 'utils/cls';
import FontSelector from '../fontSelector/FontSelector';

interface IBottomButtonProps {
  onClick: (e: any) => void;
  label: LABEL_TYPE;
  type?: 'button' | 'submit' | 'reset' | undefined;
  form?: string;
}

export type LABEL_TYPE = 'default' | '연결하기' | '시작하기' | '수정하기' | '저장하기';

export const BottomButton = ({ onClick, label, ...etc }: IBottomButtonProps) => {
  return (
    <div
      className={cls('absolute w-full px-4 z-10', label === '저장하기' ? 'bottom-4' : ' bottom-8')}
    >
      <button
        onClick={onClick}
        {...etc}
        className={cls(
          'w-full py-2 rounded-lg text-white  bg-navy-400 justify-center content-center text-center'
        )}
      >
        <FontSelector fontInfo='pretendard-bold-lg'>{label}</FontSelector>
      </button>
    </div>
  );
};
