import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { cls } from 'utils/cls';

export const NotificationButton = () => {
  const router = useRouter();
  const [readState, setReadState] = useState(true);

  return (
    <button onClick={() => router.push('/notification')} className={cls('text-gray-900')}>
      <IoNotificationsOutline fontSize='20' />
    </button>
  );
};
