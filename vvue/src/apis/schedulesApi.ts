import axios, { query } from 'apis';
import { queryFilter } from 'utils/queryFilter';

const apiUrl = '/schedules';

// 일정의 정보들
export interface ScheduleProps {
  curDate: string;
  dateType: string;
  id: number;
  marriedId: number;
  repeatCycle: string;
  scheduleDate: string;
  scheduleName: string;
}

export interface GetDdayScheduleProps {
  hasNext: boolean;
  lastId: number;
  scheduleResDtoList: ScheduleProps[];
}

export interface ScheduleTotalProps {
  memoryId: number;
  wroteMemory: boolean;
  scheduleResDto: ScheduleProps;
}
// 일정 등록 또는 수정
export interface NewScheduleProps {
  repeatCycle: string | undefined;
  scheduleDate: string | undefined;
  scheduleName: string | undefined;
}

// 일정 등록
export const createScheduleApi = async (props: NewScheduleProps) => {
  const res = await axios.post<ScheduleProps[]>(apiUrl, props);
  console.log('일정 등록!!', res.data);
  return res;
};

// 특정 일정의 정보 조회
export const getEachScheduleApi = async (scheduleId: number) => {
  const res = await axios.get<ScheduleProps>(`${apiUrl}/${scheduleId}`);
  console.log('각 일정 확인!!', res.data);
  return res.data;
};

// 특정 일정 수정
export const updateScheduleApi = async (scheduleId: number, props: NewScheduleProps) => {
  const res = await axios.put<ScheduleProps[]>(`${apiUrl}/${scheduleId}`, props);
  console.log('일정 수정!!', res.data);
  return res.data;
};

// 특정 일정 삭제
export const deleteScheduleApi = async (scheduleId: number) => {
  const res = await axios.delete(`${apiUrl}/${scheduleId}`);
  console.log('일정 삭제!!');
  return res.data;
};

// 특정 달의 일정 조회
export const getMonthScheduleApi = async (month: number, year: number) => {
  const res = await axios.get(`${apiUrl}/calendar`, {
    params: {
      month: month,
      year: year,
    },
  });
  console.log('특정 달의 일정 조회!!', res.data);
  return res.data;
};

// 특정 날짜의 일정 조회
export const getCalendarDailyApi = async (date: string) => {
  const res = await axios.get<ScheduleTotalProps[]>(`${apiUrl}/calendar-daily`, {
    params: {
      date: date,
    },
  });
  console.log('특정 날짜의 일정 확인!!', res.data);
  return res.data;
};

// D-DAY(예정된 일정) 목록 조회
export const getAllScheduleApi = async (idCursor: any, size: number) => {
  const res = await axios.get<GetDdayScheduleProps>(`${apiUrl}/dday`, {
    params: {
      idCursor: idCursor,
      size: size,
    },
  });
  console.log('D-Day 일정 출력!!', res.data);
  return res;
};

// 부부 가입 시, 결혼 기념일 또는 생일을 일정으로 등록
export const createAnniversaryApi = async (props: NewScheduleProps) => {
  const res = await axios.post<ScheduleProps[]>(`${apiUrl}/marry`, props);
  console.log('결혼기념일/부부생일 등록!!', res.data);
  return res.data;
};
