import axios from 'apis';

const apiUrl = '/auth';
export type ProviderType = 'google' | 'kakao';
export interface SocialLoginProps {
  email: string;
  nickname: string;
  provider: ProviderType;
  providerId: string;
}

export interface TokenProps {
  accessToken: string;
  refreshToken: string;
  userId: number;
}

export const socialLoginApi = async (props: SocialLoginProps) => {
  const res = await axios.post<TokenProps>(`${apiUrl}`, props);
  console.log(res.data);

  return res;
};

export interface FCMTokenProps {
  firebaseToken: string;
}
