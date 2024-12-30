import React from 'react';
import { cls } from 'utils/cls';



export default function Loading() {
  return (
    <div className='absolute w-full top-1/2 transform -translate-y-1/2 flex justify-center items-center text-center'>
      <div className={cls('flex justify-center')}>
        <div
            className={cls( 'mt-4 border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-navy-600')}
        />
      </div>
    </div>
  );
}