'use client';
import React from 'react';
import { Provider } from 'jotai';

type Props = {
  children: React.ReactNode;
};

const JotaiProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
