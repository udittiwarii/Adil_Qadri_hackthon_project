// src/components/PerfumeSwiper.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFade,
  EffectCards,
} from "swiper/modules";
import { useTheme } from "../context/ThemeContext";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";

export default function PerfumeSwiper({ products }) {
  const { darkMode } = useTheme();

  const backgroundClass = darkMode
    ? "bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"
    : "bg-gradient-to-b from-white via-blue-50 to-white text-black";

  const cardBackground = darkMode ? "bg-gray-800" : "bg-white";

  const effect = darkMode ? "fade" : "cards";
  const effectModule = darkMode ? EffectFade : EffectCards;

  return (
    <div
      className={`transition-all duration-700 px-4 py-10 w-full flex flex-col items-center justify-center ${backgroundClass}`}
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 tracking-tight">
        {darkMode ? "Dark Cloud Picks" : "Bright Cloud Picks"}
      </h2>

      {products.length === 0 ? (
        <div className="text-center text-lg opacity-60">No perfumes to show.</div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, effectModule]}
          effect={effect}
          grabCursor={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="w-[300px] sm:w-[400px] md:w-[450px]"
        >
          {products.map((product, index) => (
            <SwiperSlide
              key={index}
              className={`rounded-xl overflow-hidden shadow-xl transition-transform duration-300 transform hover:scale-105 ${cardBackground}`}
            >
              <img
                src={product.image}
                alt={product.title || "Perfume"}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">{product.title}</h3>
                <p className="text-sm opacity-80">{product.description}</p>
                <p className="mt-2 text-lg font-bold text-green-500">
                  ₹{product.price}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
