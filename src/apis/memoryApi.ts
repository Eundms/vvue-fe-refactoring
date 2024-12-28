import axios, { query } from 'apis';
import { queryFilter } from 'utils/queryFilter';

const apiUrl = '/memory';

export interface GetAllInfiniteMemory {
  allMemories: GetAllMemoryProps[];
  lastCursorId: number;
  hasNext: boolean;
}

export interface GetAllMemoryProps {
  scheduleMemoryId: number;
  pictureUrl: string;
}
export interface CreatePlaceProps {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}
export interface CreatePlaceMemoriesProps {
  comment: string;
  pictureIds: number[];
  place: CreatePlaceProps;
  rating: number;
}
export interface CreateMemoryProps {
  comment: string;
  pictureId: number;
  placeMemories: CreatePlaceMemoriesProps[];
  scheduleId: number;
}

export interface CreateMemoryReturnProps {
  memoryId: number;
}

export interface ScheduleInfoProps {
  id: number;
  name: string;
  date: string;
}

export interface PictureProps {
  id: number;
  url: string;
}

export interface UserProps {
  id: number;
  nickname: string;
  picture: PictureProps | null;
}

export interface UserMemoriesProps {
  id: number;
  comment: string;
  picture: PictureProps;
  user: UserProps;
}

export interface PlaceProps {
  id: string;
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
}

export interface CommentProps {
  id: number;
  rating: number;
  comment: string;
  user: UserProps;
}

export interface PlaceMemoriesProps {
  place: PlaceProps;
  allRating: number;
  pictures: PictureProps[];
  comments: CommentProps[];
}

export interface GetEachMemoryProps {
  id: number;
  scheduleInfo: ScheduleInfoProps;
  userMemories: UserMemoriesProps[];
  placeMemories: PlaceMemoriesProps[];
}

export const getAllMemoryApi = async (query?: query) => {
  const res = await axios.get<GetAllInfiniteMemory>(apiUrl, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

export const createMemoryApi = async (props: CreateMemoryProps) => {
  const res = await axios.post<CreateMemoryReturnProps>(apiUrl, props);
  return res;
};

export const deleteMemoryApi = async (memoryId: number) => {
  const res = await axios.delete(`${apiUrl}/${memoryId}`);
  return res.data;
};

export const getEachMemoryApi = async (scheduleMemoryId: number) => {
  const res = await axios.get<GetEachMemoryProps>(`${apiUrl}/${scheduleMemoryId}`);
  return res.data;
};
