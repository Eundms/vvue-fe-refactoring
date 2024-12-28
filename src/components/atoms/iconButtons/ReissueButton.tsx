import React from 'react';
import { IoReloadOutline } from 'react-icons/io5';
import { cls } from 'utils/cls';

export interface IReissueButtonProps {
  onClick: () => void;
}

const ReissueButton = ({ onClick }: IReissueButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cls('bg-navy-400 p-1 text-white rounded-lg active:bg-navy-500')}
    >
      <IoReloadOutline fontSize='20' />
    </button>
  );
};

export default ReissueButton;
