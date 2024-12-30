'use client';

import React, { useEffect, useState } from 'react';
import { InputItem } from '@components/atoms/item/InputItem';
import { DateItem } from '@components/atoms/item/DateItem';
import { BottomButton } from '@components/atoms/button/BottomButton';
import moment from 'moment';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import Image from 'next/image';
import useSWR from 'swr';
import { ModifyUserProps, getUserAllStatus, getUserInfoApi, modifyUserInfoApi } from 'apis/userApi';
import { IoImage } from 'react-icons/io5';
import { getImageId } from 'utils/uploadImage';
import Modal from '@components/atoms/modal/Modal';
import AgreeDisagreeButton from '@components/atoms/button/AgreeDisagreeButton';
import { useRouter } from 'next/navigation';
import { LoginStatusType } from 'app/page';
import { toast } from 'react-toastify';
export type GenderType = 'MALE' | 'FEMALE';
export default function UserProfilePage() {
  const [status, setStatus] = useState<LoginStatusType>('init');
  const userStatusData = useSWR('userStatus', () => getUserAllStatus());
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
  }, []);

  useEffect(() => {
    if (status === 'complete') {
      router.replace('/main');
    } else if (status === 'coded') {
      router.replace('/user/marry/info');
    } else if (status === 'authed') {
      router.replace('/user/marry/code');
    }
    // else if (status === 'logged') {
    //   router.replace('/user/profile');
    // }
    // else if (status === 'init') {
    //   router.replace('/auth');
    // }
  }, [status]);
  const userInfoData = useSWR('userinfo', () => getUserInfoApi());
  const { data } = userInfoData;
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string>('');
  const [profileImageFile, setProfileImageFile] = useState<FileList>();
  const [nickname, setNickname] = useState<string>('');
  const [birthday, setBirthday] = useState(new Date());
  const selectedBirthday = moment(birthday).format('YYYY-MM-DD');
  const [gender, setGender] = useState<GenderType>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    data?.data.nickname && setNickname(data?.data.nickname);
  }, [data]);
  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = event.target.files as FileList;
    const targetFilesArray = Array.from(targetFiles);
    console.log(targetFilesArray);
    const selectedFiles = targetFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    console.log(selectedFiles);
    setProfileImageFile(targetFiles);
    setProfileImage(selectedFiles[0]);
  };
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  function handleBirthdayChange(date: Date) {
    setBirthday(date);
  }
  const handleChooseMale = () => {
    setGender('MALE');
  };
  const handleChooseFemale = () => {
    setGender('FEMALE');
  };

  // 입력 값 저장
  const handleSaveInput = async () => {
    if (!selectedBirthday || !profileImageFile || !nickname || !gender) {
      setOpenModal(true);
      return;
    }
    console.log('Save');
    console.log(profileImageFile);
    const pictureId = await getImageId(profileImageFile);

    console.log(profileImage);
    console.log(nickname);
    console.log(selectedBirthday);
    console.log(gender);
    if (selectedBirthday && gender && nickname && pictureId) {
      const data: ModifyUserProps = {
        birthday: selectedBirthday,
        gender,
        nickname,
        pictureId,
      };
      console.log(data);
      const res = await modifyUserInfoApi(data);
      if (res.status === 200) {
        notify();
        router.replace('/user/marry/code');
      }
    }
  };
  const notify = () => toast('내 정보 입력이 완료되었습니다. 부부 연결하기 페이지로 이동합니다.');

  return (
    <div className='vvue-scroll h-full'>
      <div className=' flex flex-col justify-center items-center gap-2 p-2 my-28'>
      <form className='flex w-full justify-center items-center flex-shrink-0'>
        <label
          className=' border border-navy-50 w-[200px] h-[200px]  rounded-full flex justify-center items-center'
          htmlFor='profileImage'
        >
          <div className='w-full h-full '>
            {profileImage ? (
              <Image
                src={profileImage}
                alt={'프로필 이미지'}
                width={200}
                height={200}
                className='rounded-full w-full h-full object-cover'
              />
            ) : (
              <div
                className={`text-2xl flex items-center justify-center gap-2 border rounded-full border-navy-100 text-navy-100 aspect-square `}
              >
                <IoImage />
              </div>
            )}
          </div>
        </label>
        <input
          type='file'
          id='profileImage'
          className='hidden'
          accept='image/*'
          onChange={handleProfileImage}
        />
      </form>
      <InputItem
        gender={gender}
        handleChooseMale={handleChooseMale}
        handleChooseFemale={handleChooseFemale}
        inputType='GENDER'
      >
        성별
      </InputItem>
      <InputItem value={nickname} onChange={handleNicknameChange} inputType='INPUT'>
        닉네임
      </InputItem>

      <DateItem isProfile value={birthday} handleDateChange={handleBirthdayChange}>
        생일
      </DateItem>

      <div className=' text-gray-700 text-center '>
        <FontSelector fontInfo='pretendard-thin-base'>
          입력하신 정보는 소중한 배우자에게만 보이며, 서비스 최적화를 위해서 사용됩니다.
        </FontSelector>
      </div>
      </div>
      <BottomButton onClick={handleSaveInput} label='시작하기' />
      <Modal openModal={openModal}>
        <div className='flex justify-center items-center w-full flex-col p-4 gap-4'>
          <div className='w-full text-center flex justify-center'>
            <FontSelector fontInfo='pretendard-regular-lg'>모든 정보를 입력해 주세요!</FontSelector>
          </div>
          <div className=' w-full flex justify-center items-center'>
            <AgreeDisagreeButton
              onClick={() => setOpenModal(false)}
              label='네'
              className=' w-full items-center content-center justify-items-center'
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
