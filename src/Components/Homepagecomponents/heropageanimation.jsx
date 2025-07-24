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
                    .map(
                        (word) => `<span class="inline-block opacity-0 word mx-1">${word}</span>`
                    )
                    .join(" ");
            }

            const tl = gsap.timeline();

            tl.to(".word", {
                opacity: 1,
                y: 0,
                stagger: 0.2,
                duration: 1.5,
                ease: "power3.out",
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
                "-=1"
            );

            gsap.to(".perfume-bottle", {
                y: 10,
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
                {/* Background Bottle Blur */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <img
                        src="/src/assets/your-perfume-image.png"
                        alt="Blurred Background"
                        className="h-[60vw] blur-[40px] opacity-60 object-contain brightness-125"
                    />
                </div>

                {/* Floating Perfume Bottle */}
                <div
                    data-scroll
                    data-scroll-speed="-1"
                    className="absolute z-10 top-[10%] left-[50%] transform -translate-x-1/2"
                >
                    <img
                        src="/src/assets/Flux_Dev_a_lavish_highly_detailed_3D_render_of_a_luxury_perfum_3-removebg-preview.png"
                        alt="Perfume Bottle"
                        className="perfume-bottle sm:h-[30vw] h-[50vh] opacity-0 rotate-y-90"
                    />
                </div>

                {/* Animated Aroma Particles */}
                <div
                    data-scroll
                    data-scroll-speed="-2"
                    className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                >
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white opacity-20 blur-[2px] absolute aroma"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Headline & CTA */}
                <div
                    data-scroll
                    data-scroll-speed="1"
                    className="relative z-20 flex flex-col items-center justify-center text-center px-6"
                >


                    <h1 className="headline text-4xl md:text-6xl font-light tracking-wide mb-4">
                        Give your mood an aroma.
                    </h1>
                    <p className="text-xl md:text-2xl font-light tracking-wide mb-6 max-w-xl">
                        Perfumes that turn heads raise eyebrows.
                    </p>
                    <button className="mt-4 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-transparent hover:border-white hover:text-gray-200 transition">
                        Shop Now
                    </button>
                </div>
            </section>

            {/* Swiper Product Showcase */}
            <section
                data-scroll-section  
                className="bg-black mb-0 gap-0 flex-wrap text-white min-h-screen flex items-center justify-center"
            >
                <span data-scroll data-scroll-speed="-1" >
                    <Heroswiper />
                </span>
            </section>
        </div >
    );

};

export default Fluxbottleanimation;
