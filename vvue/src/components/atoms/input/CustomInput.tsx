import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { cls } from 'utils/cls';
import { UseFormReturn } from 'react-hook-form';
import { LABEL_TYPE } from './LabelInput';

export interface CustomInputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  isPlaceSearch?: boolean;
  inputStyle?: LABEL_TYPE;
  isIcon?: boolean;
  useForm: UseFormReturn<any>;
  idx?: number;
}

// eslint-disable-next-line react/display-name
export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const {
    isPlaceSearch = false,
    className = '',
    inputStyle = 'place',
    isIcon,
    useForm,
    idx,
    ...etc
  } = props;
  const { register } = useForm;
  return (
    <div className={cls('relative w-full flex justify-center items-center')}>
      {isPlaceSearch ? (
        <input
          className='w-full flex flex-col rounded-lg bg-[#E5F0FF] text-[#757575] justify-center items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF] pr-7'
          {...register(`placeMemories.${idx}.placeName`)}
          {...etc}
        />
      ) : (
        <input
          className={cls(
            'w-full flex flex-col rounded-lg bg-[#E5F0FF] text-[#757575] justify-center items-center p-2 focus:border-2 focus:outline-none focus:ring ring-[#E5F0FF] focus:border-[#B7D5FF] ',
            isIcon ? 'pr-7' : '',
            className
          )}
          {...etc}
          ref={ref}
        />
      )}

      <div className='absolute right-2 text-[#424242] text-[20px]'>
        {isIcon ? <IoLocationOutline color='#424242' fontSize='20px' /> : <></>}
      </div>
    </div>
  );
});

export default CustomInput;
