import { useEffect, useState } from 'react';
import axios from 'axios';
import { LoginStatusType } from 'utils/loginUtils';

export interface LandingStageProps {
  stage: string;
}

export const useLandingStage = (url: string) => {
  const [stage, setStage] = useState<LoginStatusType | null>(null); // stage는 LoginStatusType 타입
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError(new Error('Access token is missing'));
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        setStage(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      }
    };

    fetchData();
  }, [url]);

  return { stage, error };
};

export default useLandingStage;
