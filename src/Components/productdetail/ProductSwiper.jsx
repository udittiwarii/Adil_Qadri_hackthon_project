import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import gsap from 'gsap';
import { productsByCollection } from './../../data/products';

const ProductSwiper = () => {
  const { productId } = useParams();
  const allProducts = Object.values(productsByCollection).flat();
  const product = allProducts.find((p) => p.id.toString() === productId);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    gsap.from('.swiper-wrapper-animate', {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
    });
  }, []);

  if (!product) {
    return <p className="text-center text-red-500 mt-10">Product not found</p>;
  }

  const images = product.images || product.image || product.subImages || [];

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No images available</p>;
  }

  return (
    <div className="swiper-wrapper-animate max-w-3xl mx-auto my-10 px-4">
      {/* Main Swiper */}
      <Swiper
        spaceBetween={10}
        navigation
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="mb-4 rounded-xl overflow-hidden"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`${product.name}-${idx}`}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[Thumbs]}
        className="rounded-xl mt-2"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img}
              alt={`thumb-${idx}`}
              className="w-full h-20 object-cover rounded-md border border-gray-300 cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSwiper;
