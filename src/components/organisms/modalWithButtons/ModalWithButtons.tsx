'use client';

import React, { useState } from 'react';
import Modal from '@components/atoms/modal/Modal';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import AgreeButtons from '@components/molecules/agreeButtons/AgreeButtons';
import { deleteScheduleApi } from 'apis/schedulesApi';

export type pageType = 'DDAY' | 'OTHER';

interface IModalWithButtonsProps {
  pageType?: pageType;
  openModal: boolean;
  closeModal?: boolean;
  scheduleId?: any;
  children: React.ReactNode;
}

export default function ModalWithButtons({ pageType, openModal, closeModal, scheduleId, children }: IModalWithButtonsProps) {
  const [openStatus, setOpenStatus] = useState(true)
  
  const clickNoButton = () => {
    setOpenStatus(false)
    console.log('No')
  }

  const clickYesButton = async () => {
    console.log(scheduleId)
    if (pageType === 'DDAY') {
      await deleteScheduleApi(scheduleId)
    }
    await setOpenStatus(false)
    await console.log('Yes')
    await window.location.reload();
  }

  return (
    <div>
      <Modal openModal={openStatus}>
        <div className='mx-auto my-auto w-full'>
          <div className='w-full text-center flex justify-center px-[76px] mb-[16px]'>
            <FontSelector fontInfo='pretendard-regular-lg'>
              {children}
            </FontSelector>
          </div>
          <div className='text-white w-full flex justify-between'>
            <AgreeButtons noOnClick={clickNoButton} yesOnClick={clickYesButton}></AgreeButtons>
          </div>
        </div>
      </Modal>
    </div>
  );
}