'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'hooks/InfiniteScroll';
import { cls } from 'utils/cls';
import Image from 'next/image';
import Link from 'next/link';
import LogoGray from '../../../assets/LogoGray.png';
import { getAllMemoryApi } from 'apis/memoryApi';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import Loading from '@components/atoms/loading/Loading';

interface pageParamsProps {
  nextCursor: number;
  size: number;
}

const MemoryAlbum = () => {
  const pageSize = 12;

  let param: pageParamsProps = { nextCursor: -1, size: pageSize };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } =
    useInfiniteQuery(['memories'], ({ pageParam = param }) => fetchMoreMemories(pageParam), {
      getNextPageParam: (lastPage: any) => {
        if (!lastPage?.hasNext) return undefined;
        return { nextCursor: lastPage.lastCursorId, size: pageSize };
      },
    });

  useEffect(() => {
    param = { nextCursor: -1, size: pageSize };
    refetch();
  }, [refetch]);

  const fetchMoreMemories = async (pageParam: pageParamsProps) => {
    const data = await getAllMemoryApi(pageParam);
    return data;
  };

  return (
    <div className={cls('vvue-scroll mb-24')}>
      {isLoading ? (
        <Loading/>
      ) : data?.pages?.some((page) => page?.allMemories?.length > 0) ? (
        <div className={cls('grid grid-cols-3 ')}>
          {data?.pages?.map((page) =>
            page?.allMemories.map((memory: any) => (
              <Link href={`/memory/${memory.scheduleMemoryId}`} key={memory.scheduleMemoryId}>
                <div className={cls('aspect-w-1 aspect-h-1')}>
                  <Image
                    src={memory.pictureUrl}
                    alt='이미지'
                    className={cls('object-cover w-full h-full')}
                    width={500}
                    height={500}
                  />
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        <div className={cls('flex w-full h-full items-center justify-center pt-12')}>
          <div className={cls('text-center')}>
            <Image src={LogoGray} alt='회색 로고' width={120} />
            <FontSelector fontInfo='jua-regular-xl'>
              <div className={cls('text-gray-600 mt-2')}>추억 없음</div>
            </FontSelector>
          </div>
        </div>
      )}
      <InfiniteScroll
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
};

export default MemoryAlbum;
