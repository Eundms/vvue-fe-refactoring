import axios from 'apis';
import { type } from 'os';
import { PictureProps } from './memoryApi';

const apiUrl = '/users';

export interface UserProps {
  id: number;
  nickname: string;
  email: string;
  picture: {
    id: number;
    url: string;
  };
}

export type GenderType = 'MALE' | 'FEMALE';
export interface ModifyUserProps {
  birthday: string;
  gender: GenderType;
  nickname: string;
  pictureId: number;
}

export interface AuthStatusProps {
  authenticated: boolean;
}

export const getUserInfoApi = async () => {
  const res = await axios.get<UserProps>(`${apiUrl}`);
  return res;
};

export const modifyUserInfoApi = async (props: ModifyUserProps) => {
  const res = await axios.put<UserProps>(`${apiUrl}`, props);
  return res;
};

export const deleteUserApi = async () => {
  const res = await axios.delete(`${apiUrl}`);
  console.log(res.data);

  return res;
};

export const getUserStatusApi = async () => {
  const res = await axios.get<AuthStatusProps>(`${apiUrl}/user-info-updated`);
  console.log('결과', res.data);
  // if (res.status === 200) return res.data;
  return res;
};
