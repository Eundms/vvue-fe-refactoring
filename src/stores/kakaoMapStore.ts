import { atom } from 'jotai';

export interface Location {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | undefined;
  isLoading: boolean;
}

export const locationAtom = atom<Location>({
  center: {
    lat: 33,
    lng: 33,
  },
  errMsg: undefined,
  isLoading: false,
});
