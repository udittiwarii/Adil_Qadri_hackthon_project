import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Heroswiper from "./heroswiper";

const Fluxbottleanimation = () => {
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
      pinType: scrollEl.style.transform ? "transform" : "fixed",
    });

    const handleResize = () => {
      locoScroll.update();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    const runGSAPAnimations = () => {
      const text = document.querySelector(".headline");
      if (text) {
        const words = text.innerText.split(" ");
        text.innerHTML = words
          .map((word) => `<span class="inline-block opacity-0 word">${word}</span>`)
          .join(" ");
      }

      const tl = gsap.timeline();

      tl.to(".word", {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: "bounce.out",
      });

      tl.to(
        ".perfume-bottle",
        {
          opacity: 1,
          y: 100,
          rotateY: 0,
          duration: 1.8,
          ease: "power4.out",
        },
        "+=0.2"
      );

      gsap.to(".perfume-bottle", {
        y: 5,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      gsap.to(".perfume-bottle", {
        rotateY: 60,
        scale: 1.1,
        scrollTrigger: {
          trigger: ".perfume-bottle",
          scroller: scrollEl,
          start: "top 90%",
          end: "bottom top",
          scrub: true,
        },
        ease: "none",
      });

      gsap.utils.toArray(".aroma").forEach((el) => {
        gsap.to(el, {
          y: -100 - Math.random() * 50,
          x: "+=" + (Math.random() * 50 - 25),
          repeat: -1,
          duration: 5 + Math.random() * 3,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    };

    setTimeout(() => {
      runGSAPAnimations();
      ScrollTrigger.refresh();
      locoScroll.update();
    }, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      locoScroll.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {/* Hero Section */}
      <section
        data-scroll-section
        className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
      >
        {/* Background Blurred Bottle */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <img
            src="/src/assets/your-perfume-image.png"
            alt="Blurred Bottle"
            className="h-[60vw] filter blur-[25px] opacity-60 brightness-125 object-contain"
          />
        </div>

        {/* Perfume Bottle */}
        <div
          data-scroll
          data-scroll-speed="-1"
          className="absolute z-10 top-[10%] right-[7%] transform -translate-x-1/2"
        >
          <img
            src="src/assets/Flux_Dev_a_lavish_highly_detailed_3D_render_of_a_luxury_perfum_3-removebg-preview.png"
            alt="Perfume Bottle"
            className="perfume-bottle sm:h-[30vw] h-[50vh] opacity-0 rotate-y-90 object-contain"
          />
        </div>

        {/* Aroma Particles */}
        <div
          data-scroll
          data-scroll-speed="-2"
          className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div data-scroll data-scroll-speed="2" 
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-30 blur-[2px] absolute aroma"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Headline & Button */}
        <div
          data-scroll
          data-scroll-speed="1"
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-[90%]"
        >
          <h1 data-scroll data-scroll-speed="2" className="headline text-4xl md:text-6xl font-thin tracking-wide mb-4">
            Give your mood an aroma
          </h1>
          <p data-scroll data-scroll-speed="1" className="text-xl md:text-2xl font-thin tracking-wider max-w-xl">
            Perfumes that turn heads raise eyebrows
          </p>
          <button data-scroll data-scroll-speed="1" className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition text-base">
            Shop Now
          </button>
        </div>
      </section>

      {/* Heroswiper Section (below animation) */}
      <section data-scroll-section data-scroll-speed="-2" className="min-h-[100vh] bg-black text-white">
        <Heroswiper />
      </section>
    </div>
  );
};

export default Fluxbottleanimation;
