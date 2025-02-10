import React, { forwardRef } from 'react';
import Image from 'next/image';
import { CustomImageProps } from '../input/CustomImage';
import { cls } from 'utils/cls';
export interface ImageInputProps extends CustomImageProps {
  src: string;
  alt?: string;
}

// eslint-disable-next-line react/display-name
export const ImagePreview = forwardRef<HTMLInputElement, ImageInputProps>((props, ref) => {
  const { src, inputStyle = 'place', alt = '' } = props;

  return (
    // 외부 이미지 사용하려면 img, 내부 이미지 사용하려면 성능 이점으로 Image 태그 사용할 예정
    <Image
      alt={alt}
      src={src}
      className={cls(
        `flex items-center justify-center gap-2 border rounded-lg aspect-square object-cover`,
        inputStyle === 'place' ? 'w-20' : `w-full`
      )}
      width={inputStyle === 'place' ? 80 : 300}
      height={inputStyle === 'place' ? 80 : 300}
      
    />
  );
});

export default ImagePreview;
