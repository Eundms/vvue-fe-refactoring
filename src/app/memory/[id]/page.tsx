'use client';

import ImageCarousel from '@components/atoms/carousel/ImageCarousel';
import FontSelector from '@components/atoms/fontSelector/FontSelector';
import ImageView from '@components/atoms/image/ImageView';
import CustomTextarea from '@components/atoms/input/CustomTextarea';
import { MainWrapper } from '@components/atoms/wrapper/MainWrapper';
import { getEachMemoryApi } from 'apis/memoryApi';
import { useSetAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { IoStar } from 'react-icons/io5';
import { headerMemoryAtom } from 'stores/headerStore';
import useSWR from 'swr';

export default function DetailMemoryPage() {
  const setHeaderMemory = useSetAtom(headerMemoryAtom);

  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const scheduleMemoryId = Number(id);
  console.log(id);
  const detailMemoryData = useSWR(id, () => getEachMemoryApi(scheduleMemoryId));
  console.log(detailMemoryData);
  const { data, error } = detailMemoryData;
  setHeaderMemory(data?.scheduleInfo.name || '');

  return (
    <div className='vvue-scroll h-full'>
      <div className='bg-navy-50 w-full flex flex-col justify-center items-stretch gap-2 p-4 '>
        <div className=' flex flex-col gap-2 mb-4 '>
          <div className='bg-white  rounded-lg p-2'>
            <FontSelector fontInfo='jua-regular-24px'>장소</FontSelector>
          </div>
          {data?.placeMemories?.map((place, index) => {
            return (
              <MainWrapper round='all' key={place.place.id}>
                <div key={place.place.id} className='w-full flex flex-col gap-2'>
                  <div className='flex justify-between'>
                    <div>{place.place.placeName}</div>
                    <div className='flex justify-center items-center'>
                      <div className='text-yellow-400'>
                        <IoStar />
                      </div>
                      <div>{place.allRating}</div>
                    </div>
                  </div>
                  <ImageCarousel pictures={place.pictures} />
                  <div className='w-full flex flex-col gap-2'>
                    {place.comments.map((comment, idx) => {
                      return (
                        <div key={comment.id} className='w-full flex flex-col gap-2'>
                          <div className='w-full flex justify-between'>
                            <div className='flex justify-center items-center'>
                              <div className='flex'>
                                {comment.user.picture && (
                                  <ImageView
                                    src={comment.user.picture.url}
                                    alt={comment.user.nickname}
                                    isUserProfile
                                  />
                                )}
                              </div>
                              <div className=' text-center truncate w-full'>
                                {comment.user.nickname}
                              </div>
                            </div>
                            <div className='flex justify-center items-center'>
                              <div className='text-yellow-400'>
                                <IoStar />
                              </div>
                              <div>{place.allRating}</div>
                            </div>
                          </div>
                          <div className='w-full'>
                            <CustomTextarea readOnly value={comment.comment}></CustomTextarea>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </MainWrapper>
            );
          })}
        </div>

        <div className='flex flex-col gap-2 mb-4'>
          <div className=' bg-white rounded-lg p-2'>
            <FontSelector fontInfo='jua-regular-24px'>소감</FontSelector>
          </div>
          <div className='flex flex-col gap-2'>
            {data?.userMemories?.map((user, idx) => {
              return (
                <MainWrapper round='all' key={user.id}>
                  <div key={user.id} className='w-full flex flex-col gap-2'>
                    <div className='flex w-full gap-2 items-center'>
                      {user.user.picture && (
                        <ImageView
                          src={user.user.picture.url}
                          alt={user.user.nickname}
                          isUserProfile
                        />
                      )}
                      <div className=' text-center truncate'>{user.user.nickname}</div>
                    </div>
                    <div>
                      <ImageView src={user.picture.url} alt={user.user.nickname} />
                    </div>
                    <div className=' flex-grow'>
                      <CustomTextarea readOnly value={user.comment}></CustomTextarea>
                    </div>
                  </div>
                </MainWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
