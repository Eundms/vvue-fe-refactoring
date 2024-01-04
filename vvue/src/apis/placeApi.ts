import axios, { query } from 'apis';
import { queryFilter } from 'utils/queryFilter';

const apiUrl = '/places';

export interface queryParams {
  cursor: number;
  distance: number;
  lat: number;
  lng: number;
  size: number;
}

// 장소 조회
export const getEachScheduleApi = async (placeId: number) => {
  const res = await axios.get(`${apiUrl}/${placeId}`);
  return res;
};

//추천 장소 목록 조회
export const getRecommendPlaceListApi = async (queryParams?: queryParams) => {
  const res = await axios.get(`${apiUrl}/recommend`, {
    params: {
      ...queryFilter(queryParams),
    },
  });

  return res;
};

// 즐겨찾기 장소 목록 조회
export const getFavoritePlaceListApi = async () => {
  const res = await axios.get(`${apiUrl}/favorites`);
  return res;
};
