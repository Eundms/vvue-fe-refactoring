import React from 'react';
import FontSelector from '../fontSelector/FontSelector';

interface IPlanPlaceTextProps {
  children: React.ReactNode;
}

export const PlanPlaceText = (props: IPlanPlaceTextProps) => {
  return (
    <div className='overflow-hidden truncate w-40'>
      <FontSelector fontInfo='pretendard-extralight-sm'>
        {props.children}
      </FontSelector>
    </div>
  )
}