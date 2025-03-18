'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '../assets/Logo.png';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { loadingActions, LoginStatusType } from 'utils/loginUtils';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  const initializeFirebase = async () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY,
        });
        if (token) {
          localStorage.setItem('fcmToken', token);
        } else {
          console.warn('No registration token available.');
        }
      }
    } catch (error) {
      console.error('Error initializing Firebase:', error);
    }

    onMessage(messaging, (payload) => {
      console.log('Message received:', payload);
    });
  };

  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  };
  
  useEffect(() => {
    const startBackgroundTasks = async () => {
      const tasks = [
        initializeFirebase(),
        registerServiceWorker(),
      ];

      await Promise.allSettled(tasks); // 모든 작업 병렬 실행
    };

    startBackgroundTasks();

    const timer = setTimeout(() => {
      setShowSplash(false);
      loadingActions['init'](router);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

    return (
      <div className="relative w-full bg-navy-500">
        <div className="h-screen flex justify-center items-center">
          <Image className="w-52 pt-32 mx-auto" src={Logo} alt="Logo"  />
        </div>
      </div>
    );

}
