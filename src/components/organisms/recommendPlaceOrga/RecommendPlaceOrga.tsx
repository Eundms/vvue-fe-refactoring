'use client';
import KakaoMap from '@components/atoms/kakaoMap/KakaoMap';
import React, { useEffect, useState } from 'react';
import { cls } from 'utils/cls';
import useRecommendBottomSheet from 'utils/useRecommendBottomSheet';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecommendPlaceListApi } from 'apis/placeApi';
import InfiniteScroll from 'hooks/InfiniteScroll';
import { IoRemove } from 'react-icons/io5';
import RecommendPlaceItem from '@components/atoms/item/RecommendPlaceItem';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import Loading from '@components/atoms/loading/Loading';

interface pageParamsProps {
  cursor: number;
  distance: number;
  lat: number;
  lng: number;
  size: number;
}

export interface recommentPlaceProps {
  id: number;
  addressName: string;
  categoryGroupCode: string;
  categoryGroupName: string;
  categoryName: string;
  phone: string;
  placeName: string;
  placeUrl: string;
  roadAddressName: string;
  x: string;
  y: string;
  avgRating: string;
  visitCount: string;
  distance: string;
  favorite: boolean;
}

export interface LocationProsp {
  lat: number;
  lng: number;
}

const RecommendPlaceOrga = () => {
  const { component, openPopup, closePopup, isOpen } = useRecommendBottomSheet();
  const pageSize = 30;
  const distanceM = 100000;
  const [addressToPass, setAddressToPass] = useState<string | undefined>('멀티 캠퍼스 역삼');

  const handleLocationChange = (newAddress: string) => {
    setAddressToPass(newAddress); // 새로운 주소를 설정
  };

  let param: pageParamsProps = {
    cursor: -1,
    distance: distanceM,
    lat: 33.450701,
    lng: 126.570667,
    size: pageSize,
  };
  let locations: any;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } =
    useInfiniteQuery(
      ['recommendPlace'],
      ({ pageParam = param }) => fetchMoreRecommendPlace(pageParam),
      {
        getNextPageParam: (lastPage: any) => {
          if (!lastPage?.hasNext) return undefined;
          return {
            cursor: lastPage.lastId,
            distance: distanceM,
            lat: 33.450701,
            lng: 126.570667,
            size: pageSize,
          };
        },
      }
    );

  useEffect(() => {
    param = { cursor: -1, distance: distanceM, lat: 33.450701, lng: 126.570667, size: pageSize };
    refetch();
  }, [refetch]);

  const fetchMoreRecommendPlace = async (pageParam: pageParamsProps) => {
    const data = await getRecommendPlaceListApi(pageParam);
    return data.data;
  };

  const handleOpenModal = () => {
    const modalContent = (
      <div className={cls('overflow-y-auto pb-20')}>
        {isLoading ? (
          <Loading/>
        ) : data?.pages?.some((page) => page.recommendPlaceResDtoList?.length > 0) ? (
          <div>
            {data.pages.map((page) =>
              page.recommendPlaceResDtoList.map((recommendPlaceItem: recommentPlaceProps) => (
                <div
                  key={recommendPlaceItem.id}
                  onClick={() => handleLocationChange(recommendPlaceItem.addressName)}
                >
                  <RecommendPlaceItem recommendPlace={recommendPlaceItem} />
                </div>
              ))
            )}
          </div>
        ) : (
          <div className='flex justify-center items-center text-center h-full'>
            <FontSelector fontInfo='jua-regular-base'>
              <div>아직 추천 장소가 존재하지 않습니다.</div>
              <div>추억을 입력하여 장소를 추천해주세요.</div>
            </FontSelector>
          </div>
        )}

        <InfiniteScroll
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    );
    openPopup(modalContent);
  };
  return (
    <div className={cls('h-full w-full pb-[80px]')}>
      <KakaoMap address={addressToPass} setAddress={setAddressToPass} />
      <button
        className={cls(
          'absolute shadow-2xl rounded-t-full w-full bottom-20 z-50 bg-white flex items-center justify-center text-gray-400'
        )}
        onClick={handleOpenModal}
      >
        <IoRemove size='40' />
      </button>
      <div className={cls('z-10')}>{component}</div>
    </div>
  );
};

export default RecommendPlaceOrga;
