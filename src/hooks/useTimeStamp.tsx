import { useState, useEffect } from 'react';

const useTimeStamp = (timestamp: string | number) => {
  const [timeAgo, setTimeAgo] = useState('');

  const updateTimeStamp = () => {
    // 경과한 시간 계산 (1초 = 1000)
    const timeElapsed = Math.floor((new Date().getTime() - new Date(timestamp).getTime()) / 1000);

    if (timeElapsed < 60) {
      setTimeAgo(`방금 전`);
    } else if (timeElapsed < 60 * 60) {
      const minutes = Math.floor(timeElapsed / 60);
      setTimeAgo(`${minutes}분 전`);
    } else if (timeElapsed < 60 * 60 * 24) {
      const hours = Math.floor(timeElapsed / (60 * 60));
      setTimeAgo(`${hours}시간 전`);
    } else if (timeElapsed < 60 * 60 * 24 * 7) {
      const days = Math.floor(timeElapsed / (60 * 60 * 24));
      setTimeAgo(`${days}일 전`);
    } else if (timeElapsed < 60 * 60 * 24 * 30) {
      const days = Math.floor(timeElapsed / (60 * 60 * 24));
      setTimeAgo(`${days}주 전`);
    } else if (timeElapsed < 60 * 60 * 24 * 365) {
      const days = Math.floor(timeElapsed / (60 * 60 * 24));
      setTimeAgo(`${days}달 전`);
    } else {
      // 일주일 이상 지난 아이템에 대해서는 YYYY-MM-DD로 표기
      const date = new Date(timestamp).toISOString().slice(0, 10);
      setTimeAgo(date);
    }
  };

  useEffect(() => {
    updateTimeStamp();
  }, [timestamp]);
  return timeAgo;
};

export default useTimeStamp;
