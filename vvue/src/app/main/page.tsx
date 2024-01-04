'use client';
import React from 'react';
import { MarriedUserInfo } from '@components/molecules/profileInfo/MarriedUserInfo';
import { cls } from 'utils/cls';

const Main = () => {
  return (
    <div className={cls('absolute w-screen h-screen left-0 top-0')}>
      <MarriedUserInfo />
    </div>
  );
};

export default Main;
