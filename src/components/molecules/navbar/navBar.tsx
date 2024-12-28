'use client';
import React, { useEffect } from 'react';
import { menus } from 'constants/nav';
import { NavItemButton } from '@components/atoms/button/NavItemButton';
import { usePathname, useRouter } from 'next/navigation';
import { cls } from 'utils/cls';

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const jwtToken = localStorage.getItem('accessToken');
    if (!jwtToken) {
      console.log('token 없음');
      router.replace('/'); // '/'로 페이지 이동
      return;
    }
  }, []);

  return (
    <div className="bg-white z-10 w-full bottom-0">
      {(pathname === '/main' ||
        pathname === '/d-day' ||
        pathname === '/calendar' ||
        pathname === '/recommendplace' ||
        pathname === '/myvvue') && (
        <div className={cls('bg-navy-400 py-2 z-[99999999]')}>
          <div className={cls('justify-content items-center grid grid-cols-5 col-auto')}>
            {menus.map((menu) => (
              <div key={menu.index}>
                <NavItemButton to={menu.to} label={menu.name} />
              </div>
            ))}
          </div>
          </div>
      )}
    </div>
  );
};

export default NavBar;
