import ProfileImageView from '@components/atoms/image/ProfileImageView';
import React from 'react';
import Logo from '../../../assets/LogoOnly.png';
import { cls } from 'utils/cls';
import { IoHeart } from 'react-icons/io5';

export interface profileURLProps {
  imgUrl1: string | undefined;
  imgUrl2: string | undefined;
}

const ProfileImages = (props: profileURLProps) => {
  return (
    <div className={cls('relative w-fit h-fit')}>
      <ProfileImageView
        src={props.imgUrl1 || Logo}
        alt='프로필 이미지'
        sizeType='lg'
        className={cls('bg-white')}
      />
      <div className={cls('absolute bottom-4 right-4 z-10')}>
        <IoHeart size='24' color='#2E86FF' />
      </div>
      <ProfileImageView
        src={props.imgUrl2 || Logo}
        alt='프로필 이미지'
        sizeType='md'
        className={cls('absolute -bottom-2 -right-4 bg-white')}
      />
    </div>
  );
};

export default ProfileImages;
