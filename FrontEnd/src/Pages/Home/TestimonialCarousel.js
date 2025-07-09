import React from 'react';
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'


const TestimonialCarousel = ({ slider }) => {
  return (
    <Carousel 
    showThumbs={false} 
    showStatus={false} 
    showIndicators={false}
     autoPlay={false}
     infiniteLoop={true}
     className='w-full max-w-[1024px] flex items-center justify-center'
     >
      {slider.map((item , id)=>{
        const {image , message, name ,occupation } =item
         return(
          <div className='max-w-[840px] mx-auto px-24 ' key={id}>
            <div className='text-lg mb-9 lg:text-2xl leading-snug'>{message}</div>
            <div className='max-w-[70px] lg:max-w-[100px] mx-auto mb-3'>
              <img src={image} alt={name}></img>
            </div>
            <div className='font-bold text-[22px] text-pink-900'>{name}</div>
            <div className='italic font-medium'>{occupation}</div>
          </div>
         )
      })}
     </Carousel>
  );
};

export default TestimonialCarousel;
