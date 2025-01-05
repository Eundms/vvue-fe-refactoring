'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '../assets/Logo.png';
import { cls } from 'utils/cls';
import axios from 'apis';
import { debounce } from 'utils/debounce';

import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import useLandingStage from 'hooks/useLandingStage';
import { landingApiUrl } from 'apis/landingApi';

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

export type LoginStatusType = 'init' | 'logged' | 'authed' | 'coded' | 'complete';
export default function Home() {
  const onMessageFCM = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return;

    const firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    });

    const messaging = getMessaging(firebaseApp);

    getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY })
      .then((currentToken) => {
        if (currentToken) {
          localStorage.setItem('fcmToken', currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
    });
  };

  useEffect(() => {
    onMessageFCM();
  }, []);

  const [status, setStatus] = useState<LoginStatusType>();
  // const [spouseConnected, setSpouseConnected] = useState<boolean>(false);
  // const [spouseInfoAdded, setSpouseInfoAdded] = useState<boolean>(false);
  // const [authenticated, setAuthenticated] = useState<boolean>(false);

  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(function (registration) {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function (err) {
          console.log('Service Worker registration failed', err);
        });
    }
  }, []);

  const { stage} = useLandingStage(landingApiUrl);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const authStatus = async () => {
    if (stage) {
      setStatus(stage)
    } else { 
      setStatus('init')
    }
  };
  const debouncedFunction = debounce(authStatus, 1000);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessToken = localStorage.getItem('accessToken');
      console.log(accessToken);
      if (accessToken) {
        axios.defaults.headers.common[`Authorization`] = accessToken;
        debouncedFunction();
      } else {
        setStatus('init');
      }
    }
  }, []);

  useEffect(() => {
    console.log(status);
    if (status === 'complete') {
      router.replace('/main');
    } else if (status === 'coded') {
      router.replace('/user/marry/info');
    } else if (status === 'authed') {
      router.replace('/user/marry/code');
    } else if (status === 'logged') {
      router.replace('/user/profile');
    } else if (status === 'init') {
      router.replace('/auth');
    }
  }, [status]);

  return (
    <div className={cls('relative w-full bg-navy-500')}>
      {status && (
        <div className={cls('h-screen justify-center content-center')}>
          <Image className={cls('w-52 pt-32 mx-auto')} src={Logo} alt='Logo' />
          <div className={cls('w-screen px-4 mb-32 absolute bottom-0')}>
            {/* <GoogleLoginButton />
            <KakaoLoginButton /> */}
          </div>
        </div>
      )}
    </div>
  );
}
