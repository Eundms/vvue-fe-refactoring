import { useRouter } from 'next/navigation';
import React from 'react';
import { IoBookmarkOutline } from 'react-icons/io5';
import { cls } from 'utils/cls';

export const FavoritesButton = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/favorites')} className={cls('text-gray-900')}>
      <IoBookmarkOutline fontSize='20' />
    </button>
  );
};
