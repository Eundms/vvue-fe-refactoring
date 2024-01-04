'use client';
import React, { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import defaultMainPage from '../../../assets/defaultMainImg.png';
import MainUserInfoWrapper from '@components/atoms/wrapper/MainUserInfoWrapper';
import { useSetAtom } from 'jotai';
import { getMarriedInfoApi } from 'apis/marriedApi';
import { getUserInfoApi } from 'apis/userApi';
import {
  marriedDateAtom,
  marriedIdAtom,
  myInfoAtom,
  spouseInfoAtom,
} from 'stores/marriedUserStore';
import useSWR from 'swr';
import Image from 'next/image';

export const MarriedUserInfo = () => {
  const setMyInfo = useSetAtom(myInfoAtom);
  const setSpouseInfo = useSetAtom(spouseInfoAtom);
  const setMarriedId = useSetAtom(marriedIdAtom);
  const setMarriedDate = useSetAtom(marriedDateAtom);

  const myResult = useSWR('myInfo', () => getUserInfoApi());
  const marriedResult = useSWR('marriedInfo', () => getMarriedInfoApi());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (myResult.data?.data && marriedResult.data?.data) {
      const myInfo = myResult.data.data;
      const marriedInfo = marriedResult.data.data;

      if (
        marriedInfo &&
        myInfo &&
        marriedInfo.first &&
        marriedInfo.second &&
        myInfo?.id === marriedInfo?.first?.id
      ) {
        setMyInfo(marriedInfo?.first);
        setSpouseInfo(marriedInfo?.second);
      } else {
        setMyInfo(marriedInfo?.second);
        setSpouseInfo(marriedInfo?.first);
      }
      setMarriedId(marriedInfo?.id);
      setMarriedDate(marriedInfo?.marriedDay);

      setIsLoading(false);
    }
  }, [myResult, marriedResult]);

  let setMarriedImg: any = defaultMainPage;

  if (!isLoading) {
    setMarriedImg = marriedResult.data?.data?.picture?.url || defaultMainPage;
  }

  return (
    <div className={cls('w-full h-full justify-center items-center')}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Image src={setMarriedImg} alt='부부 이미지' layout='fill' objectFit='cover' />
          <MainUserInfoWrapper />
        </>
      )}
    </div>
  );
};
