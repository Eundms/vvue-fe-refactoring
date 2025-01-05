"use client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { LoginStatusType } from 'app/page';
import useLandingStage from 'hooks/useLandingStage';
import { landingApiUrl } from 'apis/landingApi';

interface LandingStageContextType {
  stage: LoginStatusType | null;
  error: Error | null;
}

const LandingStageContext = createContext<LandingStageContextType | undefined>(undefined);

export const LandingStageProvider = ({ children }: { children: ReactNode }) => {
  const { stage, error} = useLandingStage(landingApiUrl); // useLandingStage 훅을 통해 API 호출 및 상태 관리

  return (
    <LandingStageContext.Provider value={{ stage, error}}>
      {children}
    </LandingStageContext.Provider>
  );
};

export const useLandingStageContext = () => {
  const context = useContext(LandingStageContext);
  if (!context) {
    throw new Error('useLandingStageContext must be used within a LandingStageProvider');
  }
  return context;
};
