import axios from 'apis';
import { ProviderType, socialLoginApi } from 'apis/authApi';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { getCsrfToken } from 'next-auth/react';

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // return true;
      // TODO: api 호출
      console.log('account', account);
      console.log('user', user);
      // const data = {
      //   email: user.email as string,
      //   nickname: user.name as string,
      //   provider: account?.provider.toUpperCase() as ProviderType,
      //   providerId: account?.providerAccountId as string,
      // };
      const csrfToken = await getCsrfToken();
      console.log('로그인 후', csrfToken);
      return true;
      // TODO: GUEST인지 이미 등록한 사용자인지 구분 값에 따라 다르게 호출
      // const data: string = 'GUEST';
      // const authStatus = await getUserStatusApi();
      // if (authStatus.data.authenticated) {
      //   return '/main';
      // } else {
      //   return '/auth-code';
      // }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile }) {
      console.log(account);
      if (account) {
        token.access_token = account.access_token;
      }
      const newToken = { account, ...token };
      return newToken;
    },
    async session({ session, user, token }) {
      const newSession = { token, ...session };
      // session.accessToken = token.accessToken;
      // if (session) {
      //   session.accessToken = token.accessToken;
      // }
      return newSession;
    },
  },
  pages: {
    signOut: '/',
    error: '/error',
    newUser: '/user/profile',
  },
  session: {
    strategy: 'jwt',
  },
};

export default authOptions;
