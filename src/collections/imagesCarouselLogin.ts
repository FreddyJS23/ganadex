import { StaticImageData } from 'next/image';
import cattle from 'public/cattle.png';
import cattle2 from 'public/cattleBackgroundLogin.png';

type Image = {
    src: StaticImageData;
    alt: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
};

export const imagesSliderLogin: Image[] = [
    { src: cattle, alt: 'cattle',  width: 300 },
    { src: cattle2, alt: 'cattle2',  width: 300 },
];