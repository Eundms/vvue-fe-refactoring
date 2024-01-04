import React from 'react';
import FontSelector from '../fontSelector/FontSelector';
import { cls } from 'utils/cls';

interface ICategoryButtonProps {
  onClick: (e: any) => void;
  label: string;
}

const CategoryButton = ({ onClick, label, ...etc }: ICategoryButtonProps) => {
  return (
    <div onClick={onClick} {...etc} className={cls(`py-1 rounded-lg text-gray-900 bg-white`)}>
      <FontSelector fontInfo='pretendard-bold-lg'>{label}</FontSelector>
    </div>
  );
};

export default CategoryButton;
