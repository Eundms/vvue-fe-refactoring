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
  stage: string;
}

export const socialLoginApi = async (props: SocialLoginProps) => {
  const res = await axios.post<TokenProps>(`${apiUrl}`, props);
  if (res.status === 200) {
    axios.defaults.headers.common[`Authorization`] = res.data.accessToken;
    if (typeof window !== 'undefined') {
      localStorage.setItem('userId', ""+res.data.userId);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
    }
  }
  return res;
};

