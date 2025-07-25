import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

import Leader from "../../assets/Incense/12.webp";
import Shanaya from "../../assets/NewArival/WhatsAppImage2025-07-15at11.34.51.webp";
import Combo from "../../assets/Bakhoor/hajre-aswad-bakhoor-incense-sticks-bukhur-chips-28395324964966.webp";
import HeroImg from "../../assets/RoyalAttar/EMP06162.webp";

import { useTheme } from "../../context/ThemeContext"; // ✅ Use your custom hook

const bottleImages = [Leader, Shanaya, Combo, HeroImg];

const Heroswiper = () => {
  const scrollRef = useRef(null);
  const { darkMode } = useTheme(); // ✅ Grab dark mode from context

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const scrollEl = scrollRef.current;

    const locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      lerp: 0.08,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      locoScroll.destroy();
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      data-scroll-container
      data-scroll
      data-scroll-speed="-1"
      className={`py-12 transition-colors duration-300 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      <section className="w-full" data-scroll-section>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-6xl mx-auto"
        >
          {bottleImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className={`rounded-2xl p-6 h-[400px] flex items-center justify-center shadow-md transition-colors duration-300 ${
                  darkMode ? "bg-zinc-900" : "bg-gray-100"
                }`}
              >
                <img
                  src={src}
                  alt={`Perfume ${index + 1}`}
                  loading="lazy"
                  className="h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Heroswiper;
