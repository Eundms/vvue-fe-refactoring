import React from 'react';
import FontSelector from '../fontSelector/FontSelector';

interface IPlanTitleTextProps {
  children: React.ReactNode;
}

export const PlanTitleText = (props: IPlanTitleTextProps) => {
  return (
    <div className='mb-[4px]'>
      <FontSelector fontInfo='pretendard-bold-lg'>
        {props.children}
      </FontSelector>
    </div>
  )
}