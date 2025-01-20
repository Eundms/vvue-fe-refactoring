import axios, { query } from 'apis';
import { PlaceMemoriesProps } from './memoryApi';
import { queryFilter } from 'utils/queryFilter';

const apiUrl = '/memory-place';
export const getAllMemoryPlaceApi = async (query?: query) => {
  const res = await axios.get<PlaceMemoriesProps>(`${apiUrl}`, {
    params: {
        ...queryFilter(query),
    },
  });
  return res.data;
};