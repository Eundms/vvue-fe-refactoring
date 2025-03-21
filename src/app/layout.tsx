/* eslint-disable @next/next/no-sync-scripts */
import './globals.css';
import type { Metadata } from 'next';
import AuthProvider from 'context/Authprovider';
import Header from '@components/molecules/header/Header';
import NavBar from '@components/molecules/navbar/navBar';
import QueryWrapper from 'context/QueryWrapper';
import { refreshTokenApi } from 'apis/refreshApi';
import axios from 'apis';
import JotaiProvider from 'context/JotaiProvider';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthScript from 'context/AuthScript';
import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'vvue',
  description: '보다 나은 우리를 위해',
};

declare global {
  interface Window {
    Kakao: any;
  }
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const refresh = async (token: string) => {
    const res = await refreshTokenApi(token);
    if (res.status === 200) {
      axios.defaults.headers.common[`Authorization`] = res.data.accessToken;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      }
    }
  };

  if (typeof window !== 'undefined') {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      refresh(refreshToken);
    }
  }
  return (
    <html lang='en'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#006BFF' />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel='vvue-icon' href='/images/icon-192x192.png'></link>
        <link
          rel='stylesheet'
          as='style'
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Jua&display=swap' rel='stylesheet' />
      </head>
      <body>
        <JotaiProvider>
          <AuthProvider>
            <QueryWrapper>
              <div className='fixed-width'>
                <Header />
                <div className="flex-grow overflow-hidden">
                  {children}
                </div>
                <AuthScript />
                <ToastContainer
                  position='bottom-center'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme='light'
                  transition={Slide}
                  style={{ marginBottom: 16 }}
                />
                <NavBar />
              </div>
            </QueryWrapper>
          </AuthProvider>
        </JotaiProvider>
        <SpeedInsights/>
      </body>
    </html>
  );
}
