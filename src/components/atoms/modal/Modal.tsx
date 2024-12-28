import React, { Fragment } from 'react';

interface IModalProps {
  openModal: boolean;
  closeModal?: boolean;
  children: React.ReactNode;
}

export default function Modal({ openModal, closeModal, children }: IModalProps) {
  return (
    <div>
      {openModal ? (
        <Fragment>
          {/* 모달창 띄우면 뒷배경 불투명해지는 효과 */}
          <div className='h-full w-full fixed left-0 top-0 flex justify-center items-center bg-gray-900 bg-opacity-60 z-50'>
            {/* 모달창 */}
            <div className='flex bg-white w-[339px] py-8 rounded-[8px] z-30'>
              {children}
            </div>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}