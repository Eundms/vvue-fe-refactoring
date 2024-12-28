import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { cls } from 'utils/cls';

export const RedirectButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(router);

  const handleMoveBack = () => {
    router.back();
    history.pushState({}, '', pathname);
  };

  return (
    <button onClick={handleMoveBack} className={cls('text-gray-900')}>
      <IoArrowBack fontSize='20' />
    </button>
  );
};
