'use client';
import { imagesSliderLogin, textCarouselLogin } from '@/collections';
import Image from 'next/image';
import Slider from 'react-slick';

let settings = {
    accessibility: false,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 7000,
};

export const CarouselImagesLogin = () => {
    return (
        <Slider {...settings}>
            {imagesSliderLogin.map((image) => {
                return (
                    <div>
                        <Image {...image} className="h-[132px] md:h-[140px]" />
                    </div>
                );
            })}
        </Slider>
    );
};
export const CarouselTextLogin = () => {
    return (
        <Slider {...settings}>
            {textCarouselLogin.map(({ text }) => {
                return (
                    <div>
                        <p className="text-wrap text-center">{text}</p>
                    </div>
                );
            })}
        </Slider>
    );
};
