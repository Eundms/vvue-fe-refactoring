import axios, { query } from 'apis';
import { queryFilter } from 'utils/queryFilter';

const apiUrl = '/notify';

export interface GetNotificationProps {
  id: number;
  notificationType: string;
  content: GetNotificationContentProps;
  data: GetNotificationDataProps;
  isRead: boolean;
  receiverId: number;
  createdAt: string;
}

export interface GetNotificationContentProps {
  title: string;
  body: string;
  image: string;
}

export interface GetNotificationDataProps {
  scheduleDate: string;
}

// 알림 목록 조회
export const getAllNotificationApi = async (query?: query) => {
  const res = await axios.get<GetNotificationProps[]>(apiUrl, {
    params: {
      ...queryFilter(query),
    },
  });
  return res.data;
};

// 안 읽은 알림 존재 여부 조회
export const getIsUnReadNotificationApi = async () => {
  const res = await axios.get(`${apiUrl}/not-read`);
  return res.data;
};

// 안 읽은 알림 한번에 다 읽음 처리
export const updateReadNotificatoinapi = async () => {
  const res = await axios.get(`${apiUrl}/read`);
  return res;
};

export const unsubscribeNotificationApi = async () => {
  if (typeof window !== 'undefined') {
    const fcmToken = localStorage.getItem('fcmToken');
    const res = await axios.post('/notify/unsubscribe', { firebaseToken: fcmToken });
    return res;
  }
};
