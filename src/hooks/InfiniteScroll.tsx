'use client';
import React, { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

const InfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: InfiniteScrollProps) => {
  const target = useRef<HTMLDivElement | null>(null);

  const onIntersect = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entry.isIntersecting && !isFetchingNextPage) {
      observer.unobserve(entry.target);
      fetchNextPage();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect]);

  return (
    <>
      {hasNextPage && (
        <div>{isFetchingNextPage ? <div>로딩 중...</div> : <div ref={target}></div>}</div>
      )}
    </>
  );
};

export default InfiniteScroll;
