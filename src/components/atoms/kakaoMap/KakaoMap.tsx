'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { cls } from 'utils/cls';

export interface Location {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string | undefined;
  isLoading: boolean;
}

interface KakaoMapProps {
  address: string | undefined;
  setAddress: (address: string | undefined) => void;
}

const KakaoMap = ({ address, setAddress }: KakaoMapProps) => {
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
    if (!map || !address) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(address, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
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
  }, [address, map]);

  return (
    <>
      <Map
        center={locationDir.center}
        style={{
          width: '100%',
          height: '100%',
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
    </>
  );
};

export default KakaoMap;
