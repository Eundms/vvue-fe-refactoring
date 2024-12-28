import axios, { query } from 'apis';
import { queryFilter } from 'utils/queryFilter';

const apiUrl = '/married-code';

export interface CreateMarriedCodeProps {
  marriedCode: string;
}

// 인증 코드 일치 확인(연결)

export const marriedCodeConnectApi = async (props: CreateMarriedCodeProps) => {
  const res = await axios.post<CreateMarriedCodeProps>(`${apiUrl}/connect`, props);
  return res;
};

// 부부 인증 코드 발급(첫 발급)

export const createMarriedCodeApi = async () => {
  const res = await axios.get<CreateMarriedCodeProps>(`${apiUrl}/generate`);
  return res.data;
};

// 부부 인증 코드 재발급
export const getReMarriedCodeApi = async (query?: query) => {
  const res = await axios.get<CreateMarriedCodeProps>(`${apiUrl}/regenerate`, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};
