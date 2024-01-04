import React, { useCallback, useImperativeHandle, useRef } from 'react';
import { cls } from 'utils/cls';
import { LABEL_TYPE } from './LabelInput';

export interface CustomTextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  inputStyle?: LABEL_TYPE;
  maxLength?: number;
}

// eslint-disable-next-line react/display-name
export const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (props, ref) => {
    const { className = '', inputStyle = 'main', maxLength = 300, ...etc } = props;
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    useImperativeHandle(ref, () => textareaRef.current!);
    const resizeHeight = useCallback(() => {
      if (!textareaRef.current) return;
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }, [textareaRef]);
    return (
      <textarea
        className={cls(
          'text-[#757575] resize-none h-full w-full flex flex-col rounded-lg bg-[#E5F0FF] justify-center items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF] min-h-40 overflow-hidden'
        )}
        maxLength={inputStyle === 'place' ? 300 : 1000}
        rows={3}
        {...etc}
        ref={textareaRef}
        onInput={resizeHeight}
      />
    );
  }
);

export default CustomTextarea;
