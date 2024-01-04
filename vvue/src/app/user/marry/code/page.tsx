'use client';
import React, { useEffect, useState } from 'react';
import Logo from 'assets/Logo512.png';
import Image from 'next/image';
import { cls } from 'utils/cls';
import CodeIconInput from '@components/atoms/input/CodeIconInput';
import { BottomButton } from '@components/atoms/button/BottomButton';
import { useRouter } from 'next/navigation';
import { marriedCodeConnectApi } from 'apis/marriedCodeApi';
import useSWR from 'swr';
import { LoginStatusType } from 'app/page';
import { getUserAllStatus } from 'apis/userApi';
import { toast } from 'react-toastify';

export interface CreateMarriedCodeProps {
  marriedCode: string;
}

const MarryCodePage = () => {
  const [status, setStatus] = useState<LoginStatusType>('init');
  const userStatusData = useSWR('userStatus', () => getUserAllStatus(), { refreshInterval: 1000 });

  useEffect(() => {
    if (userStatusData.data) {
      const userStatus = userStatusData.data.data;
      if (userStatus.spouseInfoAdded && userStatus.spouseConnected && userStatus.authenticated) {
        setStatus('complete');
      } else if (
        !userStatus.spouseInfoAdded &&
        userStatus.spouseConnected &&
        userStatus.authenticated
      ) {
        setStatus('coded');
      } else if (
        !userStatus.spouseInfoAdded &&
        !userStatus.spouseConnected &&
        userStatus.authenticated
      ) {
        setStatus('authed');
      } else if (
        !userStatus.spouseInfoAdded &&
        !userStatus.spouseConnected &&
        !userStatus.authenticated
      ) {
        setStatus('logged');
      } else {
        setStatus('init');
      }
    } else {
      setStatus('init');
    }
  }, [userStatusData]);

  useEffect(() => {
    if (status === 'complete') {
      router.replace('/main');
    } else if (status === 'coded') {
      router.replace('/user/marry/info');
    }
    // else if (status === 'authed') {
    //   router.replace('/user/marry/code');
    // }
    // else if (status === 'logged') {
    //   router.replace('/user/profile');
    // }
    // else if (status === 'init') {
    //   router.replace('/auth');
    // }
  }, [status]);

  const [code, codeSet] = useState('');
  const [inputCode, inputCodeSet] = useState('');
  const [errorMessage, errorMessageSet] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   // 1. 추가 정보 입력했으면(isAuthenticated) -> main 페이지로 이동
  //   // handleIsAuthenticated();
  //   // 2. 부부 연결이 되었는지 확인(/married/info)
  //   // if (handleIsMarried()) {

  //   // }
  // }, []);

  // const handleIsAuthenticated = async () => {
  //   const result = await getUserStatusApi();
  //   console.log('page', result.status);

  //   return result.status;
  // };

  // const handleIsMarried = async () => {
  //   const result = await getMarriedInfoApi();
  //   console.log(result.status);
  //   return result.status === 200;
  // };

  const handleConnectedCode = async () => {
    const result = await marriedCodeConnectApi({ marriedCode: inputCode });
    console.log(result);
    if (result.status === 200) {
      notify();
      //TODO: 스낵바 같은 걸로 연결 성공했다고 알려주기
      router.replace('/user/marry/info');
    } else if (result.status === 400) {
      // TODO: ERROR MESSAGE
      console.log('내꺼? 이미 부부 정보가 있는 사람과 연동 시도');
    } else if (result.status === 404) {
      // TODO: 경고 문구 띄우기
      console.log('no 인증코드');
    }
  };

  const notify = () => toast('부부 연결이 완료되었습니다. 부부정보 입력하기 페이지로 이동합니다.');

  return (
    <div className={cls('w-screen h-screen flex justify-center items-center')}>
      <div className={cls('mx-auto w-full h-2/3')}>
        <Image className={cls('w-52 mx-auto')} src={Logo} alt='logo' />
        <div className={cls('w-full px-4 pt-4')}>
          <CodeIconInput inputValue={code} inputValueSet={codeSet} inputType='MINE' />
          <CodeIconInput onInputChange={inputCodeSet} />
          {errorMessage && <div></div>}
        </div>
      </div>
      <BottomButton label={'연결하기'} onClick={handleConnectedCode} />
    </div>
  );
};

export default MarryCodePage;
