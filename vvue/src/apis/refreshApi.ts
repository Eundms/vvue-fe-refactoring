import axios from 'apis';
import { TokenProps } from './authApi';
const apiUrl = '/auth/refresh-access-token';
export const refreshTokenApi = async (token: string) => {
  const res = await axios.post<TokenProps>(
    `${apiUrl}`,
    {},
    {
      headers: {
        'refresh-token': token,
      },
    }
  );
  console.log(res);
  return res;
};
