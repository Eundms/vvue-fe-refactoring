'use client';
import KakaoMap from '@components/atoms/kakaoMap/KakaoMap';
import { getAllMemoryPlaceApi } from 'apis/MemoryPlaceApi';
import React, { useEffect, useState } from 'react';
const MemoryPlace = () => { 
    const [addressToPass, setAddressToPass] = useState<string | undefined>('멀티 캠퍼스 역삼');

  useEffect(() => {
      getAllMemoryPlaceApi();
      
  }, []);
    return <KakaoMap address={addressToPass} setAddress={setAddressToPass} />
}
export default MemoryPlace;