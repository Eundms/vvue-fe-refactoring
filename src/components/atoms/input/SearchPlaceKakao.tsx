import React, { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import FontSelector from '../fontSelector/FontSelector';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Location } from '../kakaoMap/KakaoMap';

type SearchPlaceProps = {
  closePopup: () => void;
};
const SearchPlace = ({
  closePopup,
  idx,
  useForm,
  ...etc
}: SearchPlaceProps & { useForm: UseFormReturn<any> } & { idx: number }) => {
  const { setValue } = useForm;
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [keyword, setKeyword] = useState('');
  const [locationDir, setLocationDir] = useState<Location>({
    center: {
      lat: 33,
      lng: 33,
    },
    errMsg: undefined,
    isLoading: false,
  });
  const [markers, setMarkers] = useState<
    { position: { lat: string; lng: string }; content: string }[]
  >([]);
  const [map, setMap] = useState<any>();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (!map || !keyword) return;
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaceList(data);
        const bounds = new kakao.maps.LatLngBounds();
        let marker = [];

        marker.push({
          position: {
            lat: data[0].y,
            lng: data[0].x,
          },
          content: data[0].place_name,
        });
        bounds.extend(new kakao.maps.LatLng(Number(data[0].y), Number(data[0].x)));

        // 이 부분에서 map을 직접 업데이트하도록 수정
        map.setCenter(new kakao.maps.LatLng(Number(data[0].y), Number(data[0].x)));
        setMarkers(marker);
      }
    });
  }, [keyword, map]);
  return (
    <div className='flex flex-col w-full h-full gap-2 p-2'>
      <Map
        center={locationDir.center}
        style={{
          width: '100%',
          height: '0px',
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={{
              ...{
                lat: Number(marker.position.lat),
                lng: Number(marker.position.lng),
              },
            }}
          ></MapMarker>
        ))}
      </Map>
      <div>
        <FontSelector fontInfo='jua-regular-24px'>장소</FontSelector>
      </div>
      <div className='relative flex justify-center items-center'>
        <input
          className='w-full flex flex-col rounded-lg bg-[#E5F0FF] text-[#757575] justify-center items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF] pr-7'
          value={keyword}
          onChange={(evt: any) => {
            setKeyword(evt.target.value);
          }}
          {...etc}
        />
        <div className='absolute right-2 text-[#424242] text-[20px]'>
          <IoSearch color='#424242' fontSize='20px' />
        </div>
      </div>

      {placeList && (
        <div className=' max-h-full overflow-y-auto '>
          {placeList.map((place, i) => {
            return (
              <button
                key={place.id}
                className='w-full text-justify overflow-y-auto p-2 border-b'
                onClick={() => {
                  setValue(`placeMemories.${idx}.place`, place);
                  setValue(`placeMemories.${idx}.placeName`, place.place_name);
                  closePopup();
                }}
              >
                <div className=' font-bold truncate'>{place.place_name}</div>
                <div className='truncate'>{place.address_name}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchPlace;
