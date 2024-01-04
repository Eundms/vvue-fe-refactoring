'use client';

import FontSelector from '@components/atoms/fontSelector/FontSelector';
import { usePathname } from 'next/navigation';
import React from 'react';
import { menus } from 'constants/nav';
import { cls } from 'utils/cls';
import { RedirectButton } from '@components/atoms/iconButtons/RedirectButton';
import { NotificationButton } from '@components/atoms/iconButtons/NotificationButton';
import { FavoritesButton } from '@components/atoms/iconButtons/FavoritesButton';
import { useAtomValue } from 'jotai';
import { headerMemoryAtom } from 'stores/headerStore';

const Header = () => {
  const headerMemory = useAtomValue(headerMemoryAtom);
  let pathname: string = usePathname();
  const secondPathname: string = pathname.split('/')[2];
  const thirdPathname: string = pathname.split('/')[3];
  pathname = '/' + pathname.split('/')[1]; // 첫 번째 / 다음의 부분을 얻습니다.

  return (
    <>
      {pathname === '/' || pathname === '/auth' ? (
        <></>
      ) : (
        <div
          className={cls(
            pathname === '/calendar' ||
              pathname === '/d-day' ||
              pathname === '/myvvue' ||
              pathname === '/user' ||
              pathname === '/notification'
              ? 'h-14'
              : ''
          )}
        >
          <div
            className={cls(
              'fixed top-0 w-full bg-white z-50 text-center py-4 border-b-2 border-gray-40 self-center'
            )}
          >
            <FontSelector fontInfo='jua-regular-xl'>
              {pathname === '/notification' ||
              pathname === '/favorites' ||
              (pathname === '/d-day' && secondPathname) ? (
                <>
                  <div className={cls('absolute left-4 top-4')}>
                    <RedirectButton />
                  </div>
                  {pathname === '/notification' && '내 알림'}
                  {pathname === '/favorites' && '즐겨찾기'}
                  {pathname === '/d-day' &&
                    (secondPathname === 'create' ? '일정 추가하기' : '일정 수정하기')}
                </>
              ) : pathname === '/memory' ? (
                <>
                  <div className={cls('absolute left-4 top-4')}>
                    <RedirectButton />
                  </div>
                  {secondPathname === 'create' ? '추억 작성하기' : `${headerMemory}`}
                  {/* {headerMemory} */}
                </>
              ) : pathname === '/user' ? (
                secondPathname === 'profile' ? (
                  <div>내 정보 입력하기</div>
                ) : thirdPathname === 'code' ? (
                  <div>부부 연결하기</div>
                ) : (
                  <div>부부 정보 입력하기</div>
                )
              ) : (
                <>
                  {menus.map(
                    (menu) =>
                      menu.to === pathname && (
                        <div key={menu.index}>
                          <div>{menu.name}</div>
                          <div className={cls('absolute right-4 top-4')}>
                            <div className={cls('grid grid-cols-1 gap-2')}>
                              <NotificationButton />
                              {/* <FavoritesButton /> */}
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </>
              )}
            </FontSelector>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
