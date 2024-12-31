import React from 'react';

import { IoAddCircleOutline } from 'react-icons/io5';
export interface AddButtonProps {
  onClick: (e: any) => void;
  color?: string;
  size?: number;
  className?: string;
}

// eslint-disable-next-line react/display-name
export const AddButton = ({ onClick, color, size, ...etc }: AddButtonProps) => {
  return (
    <button onClick={onClick} type="button" {...etc}>
      <IoAddCircleOutline color={color ? color : '#2E86FF'} fontSize={size ? size : '40'} />
    </button>
  );
};

export default AddButton;
