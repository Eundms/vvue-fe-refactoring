import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import ImageView from '../image/ImageView';
import { PictureProps } from 'apis/memoryApi';

export interface ImageCarouselProps {
  pictures: PictureProps[];
}

const ImageCarousel = ({ pictures }: ImageCarouselProps) => {
  return (
    <Carousel showThumbs={false} infiniteLoop>
      {pictures.map((pic, idx) => {
        return (
          <div key={pic.id}>
            <ImageView src={pic.url} alt={`${pic.id}`} />
          </div>
        );
      })}
    </Carousel>
  );
};

export default ImageCarousel;
