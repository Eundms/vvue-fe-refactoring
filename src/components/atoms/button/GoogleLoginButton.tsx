'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import GoogleLogoImg from '../../../assets/socialLoginIcon/googleLogo.png';
import { cls } from 'utils/cls';

export const GoogleLoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>로그아웃</button>;
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        signIn('google');
      }}
      className={cls(
        'flex items-center w-full px-4 bg-white rounded-xl transition-transform transform active:bg-gray-100 mb-4'
      )}
    >
      <div className={cls('w-10')}>
        <Image src={GoogleLogoImg} alt='Google Login' />
      </div>
      <div className={cls('font-bold text-neutral-500 flex-1 text-center my-4')}>
        구글계정으로 로그인
      </div>
    </button>
  );
};
