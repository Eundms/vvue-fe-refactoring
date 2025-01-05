// app/dashboard/layout.tsx (대시보드 레이아웃)
import { LandingStageProvider } from 'context/LandingStageContext';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
      <LandingStageProvider>{ children}</LandingStageProvider>
  );
}
