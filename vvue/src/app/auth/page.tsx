'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from 'assets/Logo.png';
import { GoogleLoginButton } from '@components/atoms/button/GoogleLoginButton';
import { cls } from 'utils/cls';
import { KakaoLoginButton } from '@components/atoms/button/KakaoLoginButton';
import { AuthStatusProps, getUserAllStatus } from 'apis/userApi';
import { useSession } from 'next-auth/react';
import { ProviderType } from 'next-auth/providers/index';
import { FCMTokenProps, TokenProps } from 'apis/authApi';
import axios from 'apis';
import { LoginStatusType } from 'app/page';
import useSWR from 'swr';
import { debounce } from 'utils/debounce';
import { toast } from 'react-toastify';

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

  const [status, setStatus] = useState<LoginStatusType>('init');

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

      // router.push('/user/profile');
      debouncedFunction();
    }
  };
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

  const authStatus = async () => {
    const res = await getUserAllStatus();

    if (res.status === 200) {
      if (res.data.spouseInfoAdded && res.data.spouseConnected && res.data.authenticated) {
        setStatus('complete');
      } else if (!res.data.spouseInfoAdded && res.data.spouseConnected && res.data.authenticated) {
        setStatus('coded');
      } else if (!res.data.spouseInfoAdded && !res.data.spouseConnected && res.data.authenticated) {
        setStatus('authed');
      } else if (
        !res.data.spouseInfoAdded &&
        !res.data.spouseConnected &&
        !res.data.authenticated
      ) {
        setStatus('logged');
      } else {
        setStatus('init');
      }
    } else {
      setStatus('init');
    }
  };

  useEffect(() => {
    if (status === 'complete') {
      router.replace('/main');
    } else if (status === 'coded') {
      router.replace('/user/marry/info');
    } else if (status === 'authed') {
      router.replace('/user/marry/code');
    } else if (status === 'logged') {
      router.replace('/user/profile');
    }
    // else if (status === 'init') {
    //   router.replace('/auth');
    // }
  }, [status]);
  const debouncedFunction = debounce(authStatus, 0);

  return (
    <div className={cls('relative w-full h-screen bg-navy-500')}>
      <div className={cls('h-screen justify-center content-center')}>
        <Image className={cls('w-52 pt-32 mx-auto')} src={Logo} alt='Logo' />
        {session && session?.data?.user?.name ? (
          <div className='w-full bottom-0 mb-32 absolute justify-center items-center text-center'>
            <div className={cls('flex justify-center')}>
              <div
                className={cls(
                  'mt-4 border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-navy-600'
                )}
              />
            </div>
          </div>
        ) : (
          <div className={cls('w-full px-4 mb-32 absolute bottom-0')}>
            <GoogleLoginButton />
            <KakaoLoginButton />
          </div>
        )}
      </div>
    </div>
  );
}
