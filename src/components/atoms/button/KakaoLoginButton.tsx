'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import KakaoLogoImg from '../../../assets/socialLoginIcon/kakaoLogo.png';
import { cls } from 'utils/cls';

export const KakaoLoginButton = () => {

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        signIn('kakao');
      }}
      className={cls(
        'flex items-center w-full px-4 bg-kakao rounded-xl transition-transform transform active:bg-gray-100 mb-4'
      )}
    >
      <div className={cls('w-6 ml-2')}>
        <Image src={KakaoLogoImg} alt='Kakao Login' />
      </div>
      <div className={cls('font-bold text-neutral-500 flex-1 text-center my-4')}>
        카카오계정으로 로그인
      </div>
    </button>
  );
};
