// ./src/stories/Button.js

import React, { ReactNode, useMemo } from 'react';
export type ROUND = 'top' | 'bottom' | 'all' | 'no';
export interface WrapperProps {
  // 버튼 안의 내용
  children: ReactNode;
  className?: string;
  // 주 버튼 유무
  primary?: boolean;
  // top, middle, bottom 위치에 따른 radius 차이
  round?: ROUND;
}
const getRoundClasses = (round: ROUND) => {
  switch (round) {
    case 'top': {
      return 'rounded-t-lg';
    }
    case 'bottom': {
      return 'rounded-b-lg';
    }
    case 'all': {
      return 'rounded-lg';
    }
    default: {
      return '';
    }
  }
};

const getModeClasses = (isPrimary: boolean) => (isPrimary ? 'bg-[#0063EB]' : 'bg-white');

const BASE_BUTTON_CLASSES =
  'w-full h-full cursor-pointer flex flex-col justify-center items-center gap-2 p-2';

/**
 * Primary UI component for user interaction
 */
export const MainWrapper = ({
  primary = false,
  round = 'no',
  children,
  ...props
}: WrapperProps) => {
  const computedClasses = useMemo(() => {
    const modeClass = getModeClasses(primary);
    const roundClass = getRoundClasses(round);

    return [modeClass, roundClass].join(' ');
  }, [primary, round]);

  return (
    <div className={`${BASE_BUTTON_CLASSES} ${computedClasses}`} {...props}>
      {children}
    </div>
  );
};
