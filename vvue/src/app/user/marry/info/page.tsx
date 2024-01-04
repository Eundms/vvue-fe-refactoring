'use client';

import React, { useEffect, useState } from 'react';
import { DateItem } from '@components/atoms/item/DateItem';
import { BottomButton } from '@components/atoms/button/BottomButton';
import moment from 'moment';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import Image from 'next/image';
import { IoImages } from 'react-icons/io5';
import { LoginStatusType } from 'app/page';
import { getUserAllStatus } from 'apis/userApi';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { getImageId } from 'utils/uploadImage';
import { modifyMarriedInfoApi } from 'apis/marriedApi';
import { toast } from 'react-toastify';

export type GenderType = 'MALE' | 'FEMALE';
export default function MarrayInfoPage() {
  const router = useRouter();

  const [status, setStatus] = useState<LoginStatusType>('init');
  const userStatusData = useSWR('userStatus', () => getUserAllStatus(), { refreshInterval: 1000 });

  useEffect(() => {
    if (userStatusData.data) {
      const userStatus = userStatusData.data.data;
      if (userStatus.spouseInfoAdded && userStatus.spouseConnected && userStatus.authenticated) {
        setStatus('complete');
      } else if (
        !userStatus.spouseInfoAdded &&
        userStatus.spouseConnected &&
        userStatus.authenticated
      ) {
        setStatus('coded');
      } else if (
        !userStatus.spouseInfoAdded &&
        !userStatus.spouseConnected &&
        userStatus.authenticated
      ) {
        setStatus('authed');
      } else if (
        !userStatus.spouseInfoAdded &&
        !userStatus.spouseConnected &&
        !userStatus.authenticated
      ) {
        setStatus('logged');
      } else {
        setStatus('init');
      }
    } else {
      setStatus('init');
    }
  }, [userStatusData]);

  useEffect(() => {
    console.log(status);
    if (status === 'complete') {
      router.replace('/main');
    }
    // else if (status === 'coded') {
    //   router.replace('/user/marry/info');
    // } else if (status === 'authed') {
    //   router.replace('/user/marry/code');
    // }
    // else if (status === 'logged') {
    //   router.replace('/user/profile');
    // }
    // else if (status === 'init') {
    //   router.replace('/auth');
    // }
  }, [status]);

  const [homeImage, setHomeImage] = useState<string>('');
  const [homeImageFile, setHomeImageFile] = useState<FileList>();
  const [marriedDate, setMarriedDate] = useState(new Date());
  const selectedMarriedDate = moment(marriedDate).format('YYYY-MM-DD');

  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = event.target.files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    console.log(targetFilesArray);
    const selectedFiles = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(selectedFiles);
    setHomeImageFile(targetFiles);
    setHomeImage(selectedFiles[0]);
  };

  function handleMarriedDateChange(date: Date) {
    setMarriedDate(date);
  }

  // 입력 값 저장
  const handleSaveInput = async () => {
    console.log('Save');
    console.log(homeImageFile);
    console.log(selectedMarriedDate);
    const pictureId = homeImageFile ? await getImageId(homeImageFile) : -1;

    const data = {
      marriedDay: selectedMarriedDate,
      pictureId,
    };
    console.log(data);
    const res = await modifyMarriedInfoApi(data);
    if (res.status === 200) {
      notify();
      router.replace('/main');
    }
  };
  const notify = () => toast('부부 정보 입력이 완료되었습니다. 메인 페이지로 이동합니다.');

  return (
    <div className=' flex flex-col justify-center items-center gap-2 p-2 my-28'>
      <form className='flex flex-col w-full justify-center items-center flex-shrink-0'>
        <div className='w-full p-2'>
          <FontSelector fontInfo='jua-regular-md'>홈 화면</FontSelector>
        </div>
        <label
          className=' border border-navy-50 w-[200px] h-[200px]  rounded-lg flex justify-center items-center'
          htmlFor='profileImage'
        >
          <div
            className={`w-full h-full flex items-center justify-center gap-2 text-[#8ABBFF] aspect-square text-lg `}
          >
            {homeImage ? (
              <Image
                src={homeImage}
                alt={'홈 이미지'}
                // fill
                width={200}
                height={200}
                className=' w-full h-full object-cover -z-50'
              />
            ) : (
              <IoImages />
            )}
          </div>
          {/* <div className='w-full h-full '>
           
          </div> */}
        </label>
        <input
          type='file'
          id='profileImage'
          className='hidden'
          accept='image/*'
          onChange={handleProfileImage}
        />
      </form>

      <DateItem value={marriedDate} handleDateChange={handleMarriedDateChange}>
        결혼기념일
      </DateItem>
      <div className=' absolute p-2 text-gray-700 text-center bottom-40 '>
        <FontSelector fontInfo='pretendard-thin-base'>
          입력하신 정보는 소중한 배우자에게만 보이며, 서비스 최적화를 위해서 사용됩니다.
        </FontSelector>
      </div>
      <BottomButton onClick={handleSaveInput} label='시작하기' />
    </div>
  );
}
