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

const bottleImages = [
  "src/assets/Attar/Leader12ml.2-removebg-preview.png",
  "src/assets/Attar/shanayagoldboxandbottlee_1-removebg-preview (1).png",
  "src/assets/giftpack/6PCS_Combo-removebg-preview.png",
  "src/assets/giftpack/hero-img-removebg-preview (1).png"
];

const Heroswiper = () => {
  const scrollRef = useRef(null);

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
      pinType: scrollEl.style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      locoScroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container data-scroll data-scroll-speed="-1">
      <section
        className="w-full py-12 bg-black text-black"
        data-scroll-section
      >
        <Swiper
        data-scroll 
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="max-w-6xl items-center mx-auto"
        >
          {bottleImages.map((src, index) => (
            <SwiperSlide key={index} data-scroll>
              
              <div data-scroll className="bg-zinc-900 z-10 rounded-2xl p-6 h-[400px] flex items-center justify-center shadow-md">
                <img
                data-scroll 
                  src={src}
                  alt={`Perfume ${index + 1}`}
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
