'use client'
import Chevron from '@/public/chevron-right.svg';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { AppText } from '../AppText';

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

    if (!images || images.length === 0) {
        return (
            <div className='w-full h-318 flex items-center justify-center bg-gray-200 rounded-2xl'>
                <AppText 
                    className="text-(--primary) select-none"
                    size="XL"
                    text="Изображения отсутствуют"
                    variant="semibold"
                />
            </div>
        )
    }

    return (
        <div className="relative">
            <Swiper
                className="w-318 h-318"
                modules={[Navigation]}
                slidesPerView={1}
                spaceBetween={10}
            >
                {images.map((image) => (
                    <SwiperSlide key={`${image}`}>
                        <img
                            alt={`Slide ${image}`}
                            className="z-1 h-full w-full rounded-2xl object-cover"
                            src={image}
                        />
                    </SwiperSlide>
                ))}
                {images && images.length > 1 && (
                    <NavigationButtons />
                )}
                
            </Swiper>
        </div>
    );
};