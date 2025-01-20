import React from 'react';
import { IoGrid, IoGridOutline, IoLocation, IoLocationOutline } from 'react-icons/io5';
import { cls } from 'utils/cls';

interface ItabBarProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export const TabBar = ({ activeTab, setActiveTab }: ItabBarProps) => {
  return (
    <div className={cls('w-full grid grid-cols-2 border-b-[1px]')}>
      <div
        className={cls(
          `flex justify-center py-2 border-b-2 ${activeTab === 1 ? 'border-navy-500' : ''}`
        )}
        onClick={() => setActiveTab(1)}
      >
        {activeTab === 1 ? <IoGrid size='24' /> : <IoGridOutline size='24' />}
      </div>
      <div
        className={cls(
          `flex justify-center py-2 ${activeTab === 2 ? 'border-b-2 border-navy-500' : ''}`
        )}
        onClick={() => setActiveTab(2)}
      >
        {activeTab === 2 ? <IoLocation size='24' /> : <IoLocationOutline size='24' />}
      </div>
    </div>
  );
};
