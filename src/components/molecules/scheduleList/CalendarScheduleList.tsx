// 달력 밑의 일정 목록에만 스크롤바 생기도록 하기 위해
import React, { useEffect, useState } from 'react';

interface CalendarScheduleListProps {
  children: React.ReactNode;
}

const CalendarScheduleList = (props: CalendarScheduleListProps) => {
  const [windowHeight, setWindowHeight] = useState<number>(0);

  // 지금 보고 있는 화면의 세로 길이를 구하는 함수
  useEffect(() => {
    if (typeof window !== 'undefined') setWindowHeight(window.innerHeight);
    // 창 크기가 변경될 때마다 세로 길이 업데이트
    const handleResize = () => {
      if (typeof window !== 'undefined') setWindowHeight(window.innerHeight);
    };

    // 이벤트 리스너 등록
    if (typeof window !== 'undefined') window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('resize', handleResize);
    };
  }, []);

  const divHeight = windowHeight - 459;

  return (
    <div className='overflow-auto' style={{ height: `${divHeight}px` }}>
      <div>{props.children}</div>
    </div>
  );
};

export default CalendarScheduleList;
