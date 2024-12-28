import ProfileImages from '@components/molecules/profileInfo/ProfileImages';
import ProfileInfoText from '@components/molecules/profileInfo/ProfileInfoText';
import { getMarriedInfoApi } from 'apis/marriedApi';
import { getUserInfoApi } from 'apis/userApi';
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { cls } from 'utils/cls';

const ProfileInfo = () => {
  const myResult: any = useSWR('myInfo', () => getUserInfoApi());
  const marriedResult: any = useSWR('marriedInfo', () => getMarriedInfoApi());

  let spouseImgUrl: string = '';
  useEffect(() => {
    if (
      myResult.data?.data &&
      marriedResult.data?.data &&
      marriedResult.data.first &&
      marriedResult.data.second
    ) {
      spouseImgUrl =
        myResult.data.data.id === marriedResult.data.data.first.id
          ? marriedResult.data.data.second.picture.url
          : marriedResult.data.data.first.picture.url;
    }
  }, [myResult, marriedResult]);

  const nickname = myResult.data?.data?.nickname || '';
  const birthday = marriedResult.data?.data?.marriedDay || '';
  const email = myResult.data?.data?.email || '';

  return (
    <div className={cls('w-full p-8 grid grid-cols-3 gap-2 z-10')}>
      <div className={cls('content-center justify-center flex')}>
        <ProfileImages imgUrl1={myResult.data?.data?.picture?.url} imgUrl2={spouseImgUrl} />
      </div>
      <div className={cls('col-span-2 content-center justify-center flex my-auto')}>
        <ProfileInfoText nickname={nickname} birthday={birthday} email={email} />
      </div>
    </div>
  );
};

export default ProfileInfo;
