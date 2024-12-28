import React from 'react';
import StarRating from './StarRating';
import { UseFormReturn } from 'react-hook-form';

export interface CustomRatingProps extends React.DetailedHTMLProps<any, any> {
  useForm: UseFormReturn<any>;
  name: string;
  idx: number;
}
// eslint-disable-next-line react/display-name
export const CustomRating = React.forwardRef<HTMLElement, CustomRatingProps>((props, ref) => {
  const {
    className = '',

    ...etc
  } = props;

  https: return (
    <div className='w-full flex flex-col gap-4 justify-center'>
      <StarRating {...etc} />
    </div>
  );
});

export default CustomRating;
