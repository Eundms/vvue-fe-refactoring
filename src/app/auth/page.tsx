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
import { FCMTokenProps, TokenProps } from 'apis/authApi';
import axios from 'apis';
import { LoginStatusType } from 'app/page';
import Loading from '@components/atoms/loading/Loading';
import { useLandingStageContext } from 'context/LandingStageContext';


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

export default function AuthPage() {
  const router = useRouter();
  const { stage, error } = useLandingStageContext();

  const [page, setPage] = useState<LoginStatusType>('init');
  const [logined, setLogined] = useState<boolean>(false);
  const session = useSession() as any;


  const login = async (data: any) => {
    const res = await axios.post<TokenProps>('/auth', data);
    console.log(res.data);
    if (res.status === 200) {
      console.log(res);
      axios.defaults.headers.common[`Authorization`] = res.data.accessToken;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      }
      const fcmToken = localStorage.getItem('fcmToken')
        ? localStorage.getItem('fcmToken')
        : undefined;
      await axios.post<FCMTokenProps>('/notify/subscribe', { firebaseToken: fcmToken });
      setLogined(true);
      // router.push('/user/profile');
    }
  };

  useEffect(() => {
    if (stage) {
      setPage(stage);
    } else {
      setPage('init')
    }
  }, [logined, stage]); // Only run when stage changes
  

  useEffect(() => {
    if (session && session?.data?.user?.name) {
      const data = {
        email: session?.data?.user.email as string,
        nickname: session?.data?.user.name as string,
        provider: session?.data?.token?.account?.provider.toUpperCase() as ProviderType,
        providerId: session?.data?.token?.account?.providerAccountId as string,
      };
      console.log(data);
      login(data);
    }
  }, [session]);


  useEffect(() => {
    if (page === 'complete') {
      router.replace('/main');
    } else if (page === 'coded') {
      router.replace('/user/marry/info');
    } else if (page === 'authed') {
      router.replace('/user/marry/code');
    } else if (page === 'logged') {
      router.replace('/user/profile');
    }
    // else if (page === 'init') {
    //   router.replace('/auth');
    // }
  }, [page]);

  return (
    <div className={cls('relative w-full bg-navy-500')}>
      <div className={cls('h-screen justify-center content-center')}>
        <div className={cls('flex flex-col gap-[10dvh]')}>
          <Image className={cls('w-52 mx-auto')} src={Logo} alt='Logo' />
          {session && session?.data?.user?.name ? (
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
