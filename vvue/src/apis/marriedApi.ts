import axios, { query } from 'apis';
import { PictureProps } from './memoryApi';

const apiUrl = '/married';

export interface profileInfoProps {
  id: number;
  marriedDay: string;
  picture: PictureProps;
  first: userInfoProps;
  second: userInfoProps;
}

export interface userInfoProps {
  email: string;
  id: number;
  nickname: string;
  picture: {
    id: number;
    url: string;
  };
}

export interface ModifyMarriedInfoProps {
  marriedDay?: string;
  pictureId?: number;
}
// user의 부부 정보 가져오기
export const getMarriedInfoApi = async () => {
  const res = await axios.get<profileInfoProps>(`${apiUrl}/info`);
  return res;
};

export const modifyMarriedInfoApi = async (props: ModifyMarriedInfoProps) => {
  const res = await axios.put<ModifyMarriedInfoProps>(`${apiUrl}/info`, props);
  return res;
};
