'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from 'assets/Logo.png';
import { GoogleLoginButton } from '@components/atoms/button/GoogleLoginButton';
import { cls } from 'utils/cls';
import { KakaoLoginButton } from '@components/atoms/button/KakaoLoginButton';
import { useSession } from 'next-auth/react';
import { ProviderType } from 'next-auth/providers/index';
import { socialLoginApi} from 'apis/authApi';
import axios from 'apis';
import Loading from '@components/atoms/loading/Loading';
import { loadingActions, LoginStatusType } from 'utils/loginUtils';
import { setSubscribe } from 'apis/notificationApi';


export type SessionType = {
  token: {
    account: {
      provider: string;
      type: string;
      providerAccountId: string;
      access_token: string;
      token_type: string;
      refresh_token: string;
      expires_at: number;
      scope: string;
      refresh_token_expires_in: number;
    };
    name: string;
    picture: string;
    sub: string;
    access_token: string;
    iat: number;
    exp: number;
    jti: string;
  };
  user: {
    name: string;
    image: string;
  };
  expires: string;
};
export type AuthReqType = {
  email: string;
  nickname: string;
  provider: ProviderType;
  providerId: string;
} | null;
export default function AuthPage() {
  const router = useRouter();

  const [loginInfos, setLoginInfos] = useState<AuthReqType>(null);
  const { data: session, status } = useSession() as any; 

  const login = async (data: any) => {
    const res = await socialLoginApi(data);
    if (res.status === 200) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      }
      const fcmToken = localStorage.getItem('fcmToken')
      if (fcmToken) { 
        const fcmRes = await setSubscribe(fcmToken);
      }
      // router.push('/user/profile');
      loadingActions[res.data.stage as LoginStatusType](router);
    }
  };

   useEffect(() => {
    if (status === 'authenticated' && session) {
      const extractedData = {
        email: session.user?.email || '',
        nickname: session.user?.name || '',
        provider: (session.token?.account?.provider?.toUpperCase() || 'OTHER') as ProviderType,
        providerId: session.token?.account?.providerAccountId || '',
      };
      setLoginInfos(extractedData);
      login(extractedData);
    }
   }, [session, status]);
  
  
  return (
    <div className={cls('relative w-full bg-navy-500')}>
      <div className={cls('h-screen justify-center content-center')}>
        <div className={cls('flex flex-col gap-[10dvh]')}>
          <Image className={cls('w-52 mx-auto')} src={Logo} alt='Logo' />
          {loginInfos !== null ? (
            <Loading />
          ) : (
            <div className={cls('w-full px-4 relative pt-32')}>
              <GoogleLoginButton />
              <KakaoLoginButton />
            </div>
          )}
        </div>
      </div>
      </div>
  );
}
