'use client';

import React  from 'react';
import DDayScheduleList from '@components/molecules/scheduleList/DDayScheduleList';
import AddButton from '@components/atoms/iconButtons/AddButton';
import Link from 'next/link';

const DDay = () => {
  const goToCreate = () => {
    console.log('Create new plan');
  };

  return (
    <>
      <DDayScheduleList />
      <div className='absolute bottom-20 right-2'>
        <Link href='/d-day/create'>
          <AddButton onClick={goToCreate} size={45} />
        </Link>
      </div>
    </>
  );
};

export default DDay;
