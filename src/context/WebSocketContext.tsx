"use client";
import React, { createContext, ReactNode, useContext, useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { LoginStatusType } from 'utils/loginUtils';

interface WebSocketContextType {
  status: string;
  connect: (topic: string) => void;
  disconnect: () => void;
  updateStatus: LoginStatusType  |  null;
  sendMessage: (destination: string, message: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<string>('INCOMPLETE');
  const [updateStatus, setUpdateStatus] = useState<LoginStatusType | null>(null);
  const socketRef = useRef<Client | null>(null); // useRef로 변경하여 상태 변경 없이 소켓을 관리

  const [reconnectAttempts, setReconnectAttempts] = useState<number>(0); // 재연결 시도 횟수

  // WebSocket 연결 함수
  const connect = useCallback((topic: string) => {

    const socketInstance = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/back/api/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socketInstance,
      onConnect: () => {
    
        setStatus('CONNECTED');
        stompClient.subscribe(topic, (message: any) => {
          console.log(message.body)
          if (message.body) {
            try {
              setUpdateStatus(message.body);
            } catch (error) {
              console.error('Error parsing WebSocket message:', error);
            }
          }
        });
      },
      onStompError: (error) => {
        setStatus('ERROR');
        console.error('WebSocket Error: ', error);
        if (reconnectAttempts < 3) {
          // 최대 3번까지 재연결 시도
          setReconnectAttempts((prev) => prev + 1);
          setTimeout(() => {
            connect(topic); // 재연결 시도
          }, 3000);
        }
      },
    });

    stompClient.activate();
    socketRef.current = stompClient; // useRef로 소켓 객체 저장
  }, [reconnectAttempts]);

  // WebSocket 연결 해제 함수
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.deactivate();
      socketRef.current = null;
      setStatus('DISCONNECTED');
    }
  };

  const sendMessage = (destination: string, message: any) => {
  if (socketRef.current && socketRef.current.connected) {
    socketRef.current.publish({
      destination: destination, 
      body: JSON.stringify(message), 
    });
  } else {
    console.error('WebSocket is not connected.');
  }
};

  return (
    <WebSocketContext.Provider value={{ status, connect, disconnect, updateStatus, sendMessage  }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
