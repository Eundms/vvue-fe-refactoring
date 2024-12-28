import AgreeDisagreeButton from '@components/atoms/button/AgreeDisagreeButton';
import React from 'react';

interface IAgreeButtonsProps {
  yesOnClick: (e: any) => void;
  noOnClick: (e: any) => void;
}

const AgreeButtons = ({ yesOnClick, noOnClick, ...etc }: IAgreeButtonsProps) => {
  return (
    <div className='grid grid-cols-2 gap-2 mx-2 w-full'>
      <AgreeDisagreeButton onClick={noOnClick} label='아니오' type='cancel' />
      <AgreeDisagreeButton onClick={yesOnClick} label='네' />
    </div>
  );
};

export default AgreeButtons;
