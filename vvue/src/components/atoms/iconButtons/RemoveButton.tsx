import React from 'react';
import { IoCloseCircle } from 'react-icons/io5';
export interface RemoveButtonProps {
  onClick: (e: any) => void;
  color?: string;
  size?: number;
  type?: 'button' | 'submit' | 'reset' | undefined;
  className?: string;
}

// eslint-disable-next-line react/display-name
export const RemoveButton = ({ onClick, color, size, ...etc }: RemoveButtonProps) => {
  return (
    <button onClick={onClick} {...etc}>
      <IoCloseCircle color={color ? color : 'white'} fontSize={size ? size : '40'} />
    </button>
  );
};

export default RemoveButton;
