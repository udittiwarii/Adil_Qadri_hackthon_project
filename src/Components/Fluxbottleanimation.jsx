import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";

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

    // Split text
    const text = document.querySelector(".headline");
    const words = text.innerText.split(" ");
    text.innerHTML = words
      .map((word) => `<span class="inline-block opacity-0 word">${word}</span>`)
      .join(" ");

    // Animate headline words
    const tl = gsap.timeline();

    tl.to(".word", {
      opacity: 1,
      y: 0,
      stagger: 0.3,
      duration: 1.5,
      ease: "bounce.out",
    });

    // After text animation: start bottle & particle animations
    tl.from(
      ".perfume-bottle",
      {
        opacity: 0,
        y: 100,
        rotateX: 90,
        duration: 1.8,
        ease: "power4.out",
      },
      "+=0.2"
    );

    // Floating bottle animation
    gsap.to(".perfume-bottle", {
      y: "+=20",
      repeat: -1,
      yoyo: true,
      duration: 4,
      ease: "sine.inOut",
    });

    // Scroll-triggered rotation
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

    // Aroma particles float
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

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      locoScroll.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {/* SECTION 1 */}
      <section
        data-scroll-section
        className="relative min-h-screen bg-black text-white overflow-hidden"
      >
        {/* Blurred Background Bottle */}
        <div
          data-scroll
          className="absolute inset-0 z-0 flex items-center justify-center"
        >
          <img
            src="src/assets/Flux_Dev_a_lavish_highly_detailed_3D_render_of_a_luxury_perfum_3-removebg-preview.png"
            alt="Blurred Bottle"
            className="h-[600px] filter blur-[25px] opacity-60 brightness-125"
          />
        </div>

        {/* Foreground Bottle */}
        <div
          data-scroll
          data-scroll-speed="-2"
          className="absolute z-10 top-[-10%] right-20 pointer-events-none"
        >
          <img
            src="src/assets/Flux_Dev_a_lavish_highly_detailed_3D_render_of_a_luxury_perfum_3-removebg-preview.png"
            alt="Perfume Bottle"
            className="perfume-bottle h-[600px] opacity-60"
          />
        </div>

        {/* Aroma Particles */}
        <div
          data-scroll
          data-scroll-speed="2"
          className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
        >
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white opacity-30 blur-[2px] absolute aroma"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Text Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-gray-200 text-center px-4">
          <h1
            data-scroll
            data-scroll-speed="-0.3"
            className="headline text-6xl font-[Inter] font-thin tracking-wide mb-4"
          >
            Give your mood an aroma
          </h1>
          <p
            data-scroll
            data-scroll-speed="-0.3"
            className="text-2xl font-[Hepta Slab] font-thin tracking-wider max-w-xl"
          >
            Perfumes that turn heads raise eyebrows
          </p>
          <button
            data-scroll
            data-scroll-speed="-1"
            className="mt-6 font-[Inter] px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* SECTION 2 */}
      <section
        data-scroll-section
        className="min-h-screen bg-black text-white flex items-center justify-center"
      >
        <h2 className="text-4xl font-semibold">Scroll Down</h2>
      </section>
    </div>
  );
};

export default Fluxbottleanimation;
