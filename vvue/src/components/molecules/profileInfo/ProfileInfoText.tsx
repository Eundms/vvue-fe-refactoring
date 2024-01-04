import FontSelector from '@components/atoms/fontSelector/FontSelector';
import { unsubscribeNotificationApi } from 'apis/notificationApi';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { IoLogOutOutline } from 'react-icons/io5';

interface IProfileInfoText {
  nickname: string | undefined;
  birthday: string | undefined;
  email: string | undefined;
}

const ProfileInfoText = ({ nickname, birthday, email }: IProfileInfoText) => {
  const router = useRouter();
  return (
    <div>
      <div className='flex gap-2'>
        <FontSelector fontInfo='jua-regular-4xl'>{nickname}</FontSelector>
        <button
          onClick={async () => {
            if (typeof window !== 'undefined') {
              signOut();
              await unsubscribeNotificationApi();
              localStorage.removeItem('fcmToken');
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              // router.replace('/auth');
            }
          }}
        >
          <IoLogOutOutline />
        </button>
      </div>
      <div>
        <FontSelector fontInfo='pretendard-thin-sm'>{email}</FontSelector>
        <FontSelector fontInfo='pretendard-thin-sm'>{birthday}</FontSelector>
      </div>
    </div>
  );
};

export default ProfileInfoText;
