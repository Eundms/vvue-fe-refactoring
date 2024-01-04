'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'hooks/InfiniteScroll';
import { cls } from 'utils/cls';
import Image from 'next/image';
import Link from 'next/link';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import { getAllNotificationApi } from 'apis/notificationApi';
import NotificationItem from '@components/atoms/item/NotificationItem';

interface pageParamsProps {
  nextCursor: number;
  size: number;
}

export interface GetNotificationProps {
  id: number;
  notificationType: string;
  content: GetNotificationContentProps;
  data: GetNotificationDataProps;
  isRead: boolean;
  receiverId: number;
  createdAt: string;
}

export interface GetNotificationContentProps {
  title: string;
  body: string;
  image: string;
}

export interface GetNotificationDataProps {
  scheduleDate: string;
}

const NotificationInfo = () => {
  const pageSize = 15;

  let param: pageParamsProps = { nextCursor: -1, size: pageSize };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } =
    useInfiniteQuery(['memories'], ({ pageParam = param }) => fetchMoreNotification(pageParam), {
      getNextPageParam: (lastPage: any) => {
        if (!lastPage?.hasNext) return undefined;
        return { nextCursor: lastPage.nextCursorId, size: pageSize };
      },
    });

  useEffect(() => {
    param = { nextCursor: -1, size: pageSize };
    refetch();
  }, [refetch]);

  const fetchMoreNotification = async (pageParam: pageParamsProps) => {
    const data = await getAllNotificationApi(pageParam);
    return data;
  };

  return (
    <div className={cls('h-full bg-gray-200')}>
      <div className={cls('mb-24 p-2')}>
        {isLoading ? (
          <div className={cls('flex justify-center')}>
            <div
              className={cls(
                'mt-4 border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-navy-600'
              )}
            />
          </div>
        ) : data?.pages?.some((page) => page?.vvueNotificationResDtoList?.length > 0) ? (
          <div>
            {data?.pages?.map((page) =>
              page?.vvueNotificationResDtoList.map((vvueNotification: GetNotificationProps) => (
                <div>
                  <NotificationItem notification={vvueNotification} />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className={cls('flex items-center justify-center pt-12')}>
            <div className={cls('text-center')}>
              <FontSelector fontInfo='jua-regular-xl'>
                <div className={cls('text-gray-600 mt-2')}>알림 없음</div>
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
    </div>
  );
};

export default NotificationInfo;
