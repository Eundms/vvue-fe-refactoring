'use client';

import React, { useState, useEffect } from 'react';
import DDayScheduleList from '@components/molecules/scheduleList/DDayScheduleList';
import NavBar from '@components/molecules/navbar/navBar';
import AddButton from '@components/atoms/iconButtons/AddButton';
import Link from 'next/link';

const DDay = () => {
  const goToCreate = () => {
    console.log('Create new plan');
  };

  return (
    <div>
      <div className='overflow-auto mb-24'>
        <DDayScheduleList />
      </div>
      <div className='absolute bottom-20 right-2'>
        <Link href='/d-day/create'>
          <AddButton onClick={goToCreate} size={45} />
        </Link>
      </div>
      <NavBar />
    </div>
  );
};

export default DDay;
