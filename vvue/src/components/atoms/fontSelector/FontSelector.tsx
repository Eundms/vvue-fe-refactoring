import React, { FC } from 'react';
import { cls } from 'utils/cls';

interface IFontSelectorProps {
  fontInfo: string;
  children: any;
}

const FontSelector: FC<IFontSelectorProps> = ({ fontInfo, children }) => {
  const [fontName, fontWeight, fontSize] = fontInfo.split('-');

  const style = {
    fontFamily: fontName,
  };

  return (
    <div style={style} className={cls(`font-${fontWeight} text-${fontSize}`)}>
      {children}
    </div>
  );
};

export default FontSelector;
