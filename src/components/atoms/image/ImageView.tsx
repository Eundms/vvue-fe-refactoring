import React from 'react';
import Image from 'next/image';
import { cls } from 'utils/cls';
export interface ImageViewProps {
  src: string;
  alt: string;
  className?: string;
  isUserProfile?: boolean;
}

// eslint-disable-next-line react/display-name
export const ImageView = (props: ImageViewProps) => {
  const { src, className = '', alt = '', isUserProfile = false } = props;

  return (
    // 외부 이미지 사용하려면 img, 내부 이미지 사용하려면 성능 이점으로 Image 태그 사용할 예정
    <Image
      alt={alt}
      src={src}
      className={cls(
        ` object-cover flex items-center justify-center gap-2 border aspect-square`,
        isUserProfile ? 'w-8 rounded-full' : 'w-full rounded-lg ',
        className
      )}
      width={300}
      height={300}
    />
  );
};

export default ImageView;
