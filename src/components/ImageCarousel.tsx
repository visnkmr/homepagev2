'use client'
import Carousel from './Carousel/Carousel';
import './Carousel/Carousel.css';
import '../../styles/globals.css'
import Llimage from './llimage';

export default function ImageCarousel({ imageUrls }: { imageUrls: string[] }) {
    if (!imageUrls || imageUrls.length === 0) {
        return null;
    }

    if (imageUrls.length === 1) {
        return <Llimage url={imageUrls[0]} />;
    }

    return (
        <Carousel show={1} infiniteLoop={true} withIndicator={true} autoSlide={true} autoSlideDelay={3000}>
            {imageUrls.map((url, index) => (
                <div key={index}>
                    <Llimage url={url} />
                </div>
            ))}
        </Carousel>
    );
}
