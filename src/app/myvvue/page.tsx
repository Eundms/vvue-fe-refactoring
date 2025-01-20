'use client';
import React, { useEffect, useState } from 'react';
import ProfileInfo from '@components/organisms/profileInfo/ProfileInfo';
import { TabBar } from '@components/atoms/tabBar/TabBar';
import MemoryAlbum from '@components/molecules/memoryAlbum/MemoryAlbum';
import { cls } from 'utils/cls';
import MemoryPlace from '@components/molecules/memoryPlace/MemoryPlace';

const MyVVUE = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isTabBarFixed, setIsTabBarFixed] = useState(false);

  useEffect(() => {
    scrollToTop();
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 100) {
        setIsTabBarFixed(true);
      } else {
        setIsTabBarFixed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <ProfileInfo />
      <div
        className={cls(isTabBarFixed ? 'w-full fixed top-14 bg-white' : '', 'z-10')}
        style={{ transition: 'all 0.3s' }}
      >
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    
      {activeTab === 1 ? (
          <div className={cls('flex-1 h-full')}>
        <MemoryAlbum />
      </div>
      ) : (
          <div className={cls('flex-1 h-full')}>
        <MemoryPlace/>
      </div>
      )}
    </>
  );
};

export default MyVVUE;
