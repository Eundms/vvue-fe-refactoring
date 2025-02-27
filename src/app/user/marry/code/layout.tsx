// app/dashboard/layout.tsx (대시보드 레이아웃)
import { WebSocketProvider } from 'context/WebSocketContext';
import { ReactNode } from 'react';

export default function MarryCodeLayout({ children }: { children: ReactNode }) {
  return (
      <WebSocketProvider>{ children}</WebSocketProvider>
  );
}
