import { LoginStatusType } from 'app/page';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

// LandingStageProps의 정의
export interface LandingStageProps {
  stage: string;
}

export const useLandingStage = (url: string) => {
  const [stage, setStage] = useState<LoginStatusType | null>(null); // stage는 LoginStatusType 타입
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('useLandingStage');

    // accessToken 가져오기
    if (typeof window === 'undefined') {
      return; // 서버 사이드에서는 코드 실행 안 함
    }

    const accessToken = localStorage.getItem('accessToken');

    console.log('useLandingStage' + accessToken);

    if (!accessToken) {
      setError(new Error('Access token is missing'));
      return;
    }

    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('useLandingStage' + eventSource);

    // 'open' 이벤트 처리
    eventSource.addEventListener('open', (event) => {
      console.log('Connection established:', event);
      // 서버와 연결이 성공적으로 열렸을 때 추가 작업을 여기서 처리할 수 있습니다.
    });

    // 'message' 이벤트 처리
    eventSource.addEventListener('message', (event) => {
      try {
        console.log('useLandingStage - message received:', event);

        const data: LoginStatusType = event.data;  // JSON 데이터 파싱 후 LoginStatusType으로 변환

        console.log('useLandingStage - parsed data:', data);

        setStage(data); // 상태 업데이트
      } catch (err) {
        setError(new Error('Invalid SSE data format'));
      }
    });

    // 'error' 이벤트 처리
    eventSource.addEventListener('error', (event) => {
      console.error('Error occurred:', event);
      setError(new Error('SSE connection error'));
    });

    // 클린업 함수: 컴포넌트가 언마운트 될 때 SSE 연결을 종료
    return () => {
      eventSource.close();
    };
  }, [url]);

  return { stage, error };
};

export default useLandingStage;
