'use client'
import Chevron from '@/public/chevron-right.svg';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const NavigationButtons = () => {
    const swiper = useSwiper();
    const [isBeginning, setIsBeginning] = useState(swiper.isBeginning);
    const [isEnd, setIsEnd] = useState(swiper.isEnd);

    swiper.on('slideChange', () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    });

    return (
        <>
            <button 
                aria-label="Previous slide"
                className={`absolute left-10 top-1/2 rotate-180 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full transition-opacity ${
                    isBeginning ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100'
                }`}
                onClick={() => swiper.slidePrev()}
            >
                <Chevron />
            </button>
            <button 
                aria-label="Next slide"
                className={`absolute right-10 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full transition-opacity ${
                    isEnd ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100'
                }`}
                onClick={() => swiper.slideNext()}
            >
                <Chevron />
            </button>
        </>
    );
};

export const AppSwiper = ({ images }: { images: string[] }) => {
    return (
        <div className="relative">
            <Swiper
                className="w-318 h-318"
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={10}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={`${index} - ${image}`}>
                        <img
                            alt={`Slide ${index + 1}`}
                            className="z-1 h-full w-full rounded-2xl object-cover"
                            src={image}
                        />
                    </SwiperSlide>
                ))}
                <NavigationButtons />
            </Swiper>
        </div>
    );
};