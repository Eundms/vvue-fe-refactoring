import React from 'react';
import Image from 'next/image';
import { cls } from 'utils/cls';

export interface ProfileImageViewProps {
  src: any;
  alt: string;
  className?: string;
  sizeType: 'sm' | 'md' | 'lg' | 'xl' | undefined;
}

// eslint-disable-next-line react/display-name
export const ProfileImageView = (props: ProfileImageViewProps) => {
  const { src, className = '', alt = '', sizeType = 'md' } = props;

  return (
    // 외부 이미지 사용하려면 img, 내부 이미지 사용하려면 성능 이점으로 Image 태그 사용할 예정
    <Image
      alt={alt}
      src={src}
      className={cls(
        `flex items-center justify-center gap-2 border object-cover rounded-full`,
        sizeType === 'sm' ? 'w-8 h-8' : '',
        sizeType === 'md' ? 'w-12 h-12' : '',
        sizeType === 'lg' ? 'w-28 h-28' : '',
        sizeType === 'xl' ? 'w-48 h-48' : '',
        className
      )}
      width={50}
      height={50}
      
    />
  );
};

export default ProfileImageView;
