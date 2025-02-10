import Link from 'next/link';
import React from 'react';
import { cls } from 'utils/cls';
import Logo from '../../../assets/LogoOnly.png';
import Image from 'next/image';
import useTimeStamp from 'hooks/useTimeStamp';
import FontSelector from '../fontSelector/FontSelector';

interface NotificationItemProps {
  notification: GetNotificationProps;
}

export interface GetNotificationProps {
  id: number;
  notificationType: string;
  content: GetNotificationContentProps;
  data: GetNotificationDataProps;
  isRead: boolean;
  receiverId: number;
  createdAt: string;
}

export interface GetNotificationContentProps {
  title: string;
  body: string;
  image: string;
}

export interface GetNotificationDataProps {
  scheduleDate: string;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  console.log(notification);

  return (
    <div className={cls('bg-white mb-2 rounded-lg px-4 py-3 grid grid-cols-12')}>
      <div className={cls('col-span-1')}>
        {!notification.isRead && (
          <div className={cls('flex items-center h-full')}>
            <div className={cls('rounded-full w-2 h-2 bg-navy-500')} />
          </div>
        )}
      </div>
      <div
        className={cls(
          'col-span-2',
          (notification.notificationType === 'BIRTH' || 'MARRIED') && 'rounded-full'
        )}
      >
        <Image
          src={notification.content.image ? notification.content.image : Logo}
          alt='Notification Image'
          width={50}
          height={50}
          
        />
      </div>
      <div className={cls('col-span-7 ml-2')}>
        <div className={cls('flex items-center h-full')}>
          <FontSelector fontInfo='pretendard-regular-base'>
            {notification.content.body}
          </FontSelector>
        </div>
      </div>
      <div className={cls('col-span-2 flex justify-end')}>
        <div className={cls('text-gray-600')}>
          <FontSelector fontInfo='pretendard-ExtraLight-sm'>
            {useTimeStamp(notification.createdAt)}
          </FontSelector>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
