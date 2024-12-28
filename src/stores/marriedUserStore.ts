import { atom } from 'jotai';

export interface userInfoProps {
  email: string;
  id: number;
  nickname: string;
  picture?: {
    id: number;
    url: string;
  };
}
// first 객체에 대한 상태 원자 정의

export const myInfoAtom = atom<userInfoProps>({
  email: '',
  id: -1,
  nickname: '',
  picture: {
    id: -1,
    url: '',
  },
});

export const spouseInfoAtom = atom<userInfoProps>({
  email: '',
  id: -1,
  nickname: '',
  picture: {
    id: -1,
    url: '',
  },
});

// 부부 정보
export const marriedIdAtom = atom(-1);
export const marriedDateAtom = atom('');
export const marriedCommonImgAtom = atom('');
