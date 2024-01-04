'use client';
import React, { DetailedHTMLProps, forwardRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { Rating } from 'react-simple-star-rating';

export interface StarRatingProps extends DetailedHTMLProps<any, any> {
  useForm: UseFormReturn<any>;
  name: string;
  idx: number;
}
// eslint-disable-next-line react/display-name
export const StarRating = forwardRef<HTMLElement, StarRatingProps>((props, ref) => {
  const { className = '', useForm, idx, ...etc } = props;

  const [rating, setRating] = useState(0);
  const { setValue } = useForm;
  const handleRating = (rate: number) => {
    console.log(rate);
    setRating(rate);
    setValue(`placeMemories.${idx}.rating`, rate);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <Rating
        fillStyle={{ display: '-webkit-inline-box' }}
        emptyStyle={{ display: 'flex' }}
        allowFraction
        onClick={handleRating}
        emptyIcon={<IoStarOutline />}
        fillIcon={<IoStar />}
        transition
        className='text-[50px]'
        size={50}
        emptyColor='#FFB300'
        fillColor='#FFB300'
        SVGstrokeColor='text-yellow-400'
      />
    </div>
  );
});

export default StarRating;
