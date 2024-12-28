import React from 'react';
import { cls } from 'utils/cls';
import FontSelector from '../fontSelector/FontSelector';
import { IoStar } from 'react-icons/io5';
import { useAtom } from 'jotai';
import { locationAtom } from 'stores/kakaoMapStore';

export interface recommendPlaceProps {
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

const RecommendPlaceItem = ({ recommendPlace }: { recommendPlace: recommendPlaceProps }) => {
  return (
    <div className={cls('mx-4 bg-navy-50 rounded-lg mb-2 p-4')}>
      <FontSelector fontInfo='jua-semiBold-2xl'>{recommendPlace.placeName}</FontSelector>

      <div className='flex items-center'>
        <div className='text-yellow-400'>
          <IoStar />
        </div>
        <div className={cls('ml-3')}>{recommendPlace.avgRating}</div>
      </div>

      <div className='flex items-center'>
        <FontSelector fontInfo='pretendard-regular-base'>
          <div>{recommendPlace.roadAddressName}</div>
          <div>{recommendPlace.phone}</div>
          <div>방문횟수: {recommendPlace.visitCount}</div>
        </FontSelector>
      </div>
    </div>
  );
};

export default RecommendPlaceItem;
