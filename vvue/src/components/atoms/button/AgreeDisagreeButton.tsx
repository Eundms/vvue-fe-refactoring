import React from 'react';
import { cls } from 'utils/cls';
import FontSelector from '../fontSelector/FontSelector';

interface IAgreeDisagreeButtonProps {
  onClick: (e: any) => void;
  label: LABEL_TYPE;
  type?: COLOR_TYPE;
  className?: string;
}

export type LABEL_TYPE = 'default' | '네' | '아니오';
export type COLOR_TYPE = 'default' | 'cancel';

const AgreeDisagreeButton = ({
  onClick,
  label,
  type,
  className,
  ...etc
}: IAgreeDisagreeButtonProps) => {
  return (
    <button
      onClick={onClick}
      {...etc}
      className={cls(
        `py-1 rounded-lg text-white justify-center content-center text-center ${
          type === 'cancel' ? 'bg-gray-400' : 'bg-navy-400'
        } ${className}`
      )}
    >
      <FontSelector fontInfo='pretendard-bold-lg'>{label}</FontSelector>
    </button>
  );
};

export default AgreeDisagreeButton;
