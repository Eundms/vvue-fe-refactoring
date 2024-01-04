import NotificationInfo from '@components/molecules/notificationList/NotificationInfo';
import React from 'react';
import { cls } from 'utils/cls';

const Notification = () => {
  return (
    <div className={cls('h-screen')}>
      <NotificationInfo />
    </div>
  );
};

export default Notification;
