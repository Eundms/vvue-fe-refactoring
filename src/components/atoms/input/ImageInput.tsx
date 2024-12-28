import { UseFormReturn } from 'react-hook-form';
import CustomImage from './CustomImage';

export interface ImageInputProps {
  inputStyle: 'place' | 'user';
  idx: number;
}

export interface SelectInputAdditionalProps {
  useForm: UseFormReturn<any>;
  name: string;
}

export const ImageInput = (props: ImageInputProps & SelectInputAdditionalProps) => {
  return (
    <div className='w-full flex gap-3'>
      <CustomImage {...props} />
    </div>
  );
};

export default ImageInput;
