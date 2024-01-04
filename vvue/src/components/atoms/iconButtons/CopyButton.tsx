import React from 'react';
import { IoClipboardOutline } from 'react-icons/io5';
import { cls } from 'utils/cls';

export interface ICopyButtonProps {
  onClick: () => void;
}

const CopyButton = ({ onClick }: ICopyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cls('bg-navy-400 p-1 text-white rounded-lg active:bg-navy-500')}
    >
      <IoClipboardOutline fontSize='20' />
    </button>
  );
};

export default CopyButton;
