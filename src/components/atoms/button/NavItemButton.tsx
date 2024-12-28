'use client';

import React, { FC } from 'react';
import Link from 'next/link';

import { IconType } from 'react-icons';
//아이콘 추가 부분
import {
  IoTimeOutline,
  IoTime,
  IoCalendarClearOutline,
  IoCalendarClear,
  IoHomeOutline,
  IoHome,
  IoMapOutline,
  IoMap,
  IoPersonOutline,
  IoPerson,
} from 'react-icons/io5';
import { cls } from 'utils/cls';
import { usePathname } from 'next/navigation';
import FontSelector from '../fontSelector/FontSelector';

export interface NavItemButtonProps {
  label: string;
  to: string;
}

const iconMap: { [key: string]: IconType } = {
  디데이: IoTime,
  달력: IoCalendarClear,
  홈: IoHome,
  추천장소: IoMap,
  나의쀼: IoPerson,
};

const unClickIconMap: { [key: string]: IconType } = {
  디데이: IoTimeOutline,
  달력: IoCalendarClearOutline,
  홈: IoHomeOutline,
  추천장소: IoMapOutline,
  나의쀼: IoPersonOutline,
};

const defaultIcon: IconType = IoHome;

export const NavItemButton: FC<NavItemButtonProps> = ({ to = '/', label = 'default' }) => {
  const pathname = usePathname();
  const IconComponent = iconMap[label] || defaultIcon;
  const UnClickComponent = unClickIconMap[label] || defaultIcon;

  return (
    <div className={cls('w-full items-center justify-center my-2 text-white')}>
      <Link href={to}>
        <div className={cls('flex flex-col items-center')}>
          {pathname === to ? <IconComponent fontSize='24' /> : <UnClickComponent fontSize='24' />}
          <div className={cls('mt-1')}>
            <FontSelector fontInfo='jua-regular-sm'>{label}</FontSelector>
          </div>
        </div>
      </Link>
    </div>
  );
};
