import React from 'react';
import { RegisterOptions, UseFormReturn } from 'react-hook-form';
import CustomInput, { CustomInputProps } from './CustomInput';
import CustomTextarea, { CustomTextareaProps } from './CustomTextarea';
import ImageInput, { ImageInputProps } from './ImageInput';
import { cls } from 'utils/cls';
import { MainWrapper } from '../wrapper/MainWrapper';
import CustomRating, { CustomRatingProps } from './CustomRating';
import FontSelector from '../fontSelector/FontSelector';
import SearchPlace from './SearchPlaceKakao';
export type LABEL_TYPE = 'user' | 'place';

interface LabelInputDefaultProps {
  inputName: string;
  labelName: string;
  className?: string;
  isIcon?: boolean;
  isRequired?: boolean;
  registerOptions?: RegisterOptions;
  inputStyle?: LABEL_TYPE;
  small?: boolean;
  large?: boolean;
  productType?: string;
  handleAddImages?: (event: any) => void;
  handleDeleteImage?: (id: string) => void;
  openPopup?: (target: JSX.Element) => void;
  closePopup?: (callback?: (() => void) | undefined) => void;
}

interface LabelInputInputProps
  extends LabelInputDefaultProps,
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    CustomInputProps {
  inputType?: 'input';
}

interface LabelInputTextAreaProps
  extends LabelInputDefaultProps,
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    CustomTextareaProps {
  inputType: 'textarea';
}

interface LabelInputImageProps extends LabelInputDefaultProps {
  inputType: 'image';
  handleAddImages?: (event: any) => void;
  handleDeleteImage?: (id: string) => void;
}
interface LabelInputRatingProps extends LabelInputDefaultProps {
  inputType: 'rating';
}
export type LabelInputPropsType =
  | LabelInputInputProps
  | LabelInputTextAreaProps
  | LabelInputImageProps
  | LabelInputRatingProps;

export const LabelInput = (
  props: LabelInputPropsType & { useForm: UseFormReturn<any> } & { idx?: number }
) => {
  const {
    inputType = 'input',
    useForm,
    inputName,
    labelName,
    className = '',
    isRequired = false,
    registerOptions = {},
    inputStyle = 'place',
    isIcon = false,
    productType,
    large = false,
    idx = -1,
    openPopup,
    closePopup,
    ...etc
  } = props;
  const { register } = useForm;
  return (
    <label htmlFor={labelName} className='w-full'>
      <MainWrapper round={labelName === '장소' ? 'top' : labelName === '후기' ? 'bottom' : 'no'}>
        <div className='w-full flex flex-col justify-center items-center gap-2'>
          <div className='w-full'>
            <FontSelector fontInfo={'jua-regular-14px'}>{labelName}</FontSelector>
          </div>
          {isRequired && <div className='text-[15px] text-[#FF5C00]'>*</div>}
        </div>
        <div className={cls('w-full')}>
          {inputType === 'input' && (
            <CustomInput
              useForm={useForm}
              isIcon={isIcon}
              idx={idx}
              {...register(inputName, registerOptions)}
              onClick={() => {
                openPopup &&
                  closePopup &&
                  openPopup(
                    <SearchPlace key={idx} idx={idx} useForm={useForm} closePopup={closePopup} />
                  );
              }}
              {...(etc as {})}
            />
          )}
          {inputType === 'textarea' && (
            <CustomTextarea
              {...(etc as {})}
              inputStyle={inputStyle}
              {...register(inputName, registerOptions)}
            />
          )}
          {inputType === 'rating' && (
            <CustomRating
              {...(etc as CustomRatingProps)}
              name={inputName}
              useForm={useForm}
              idx={idx}
            />
          )}
          {inputType === 'image' && (
            <ImageInput
              {...(etc as ImageInputProps)}
              inputStyle={inputStyle}
              useForm={useForm}
              name={inputName}
              idx={idx}
            />
          )}
        </div>
      </MainWrapper>
    </label>
  );
};

interface LabelTextAreaEachProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  labelName: string;
  className?: string;
  isRequired?: boolean;
}

// eslint-disable-next-line react/display-name
export const LabelTextArea = React.forwardRef<HTMLTextAreaElement, LabelTextAreaEachProps>(
  (props, ref) => {
    const { labelName, className = '', isRequired = false, ...etc } = props;
    return (
      <div className='flex w-full gap-1 justify-center items-center'>
        <div className='w-1/4 text-lg text-[#292929] flex gap-0.5 items-start'>
          <div>{labelName}</div>
          {isRequired && <div className='text-[15px] text-[#FF5C00]'>*</div>}
        </div>
        <div className='w-3/4'>
          <textarea
            {...(etc as {})}
            ref={ref}
            rows={3}
            className='w-full bg-white border border-[#DBDBDB] py-2.5 px-4 rounded-lg text-lg placeholder:text-[#ACACAC]'
          />
        </div>
      </div>
    );
  }
);

export default LabelInput;
