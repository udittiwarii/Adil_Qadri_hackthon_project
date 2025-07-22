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
            <section
                data-scroll-section
                className="relative sm:min-h-[70vh] min-h-[50vh] pt-[2rem] bg-black text-white flex items-center justify-center"
            >
                {/* Blurred Bottle BG */}
                <div
                    data-scroll
                    className="absolute inset-0 z-0 flex items-center justify-center"
                >
                    <img
                        src="src/assets/Flux_Dev_a_lavish_highly_detailed_3D_render_of_a_luxury_perfum_3-removebg-preview.png"
                        alt="Blurred Bottle"
                        className="h-[60vw] sm:h-[50vw] md:h-[40vw] lg:h-[35vw] filter blur-[25px] opacity-60 brightness-125 object-contain"
                    />
                </div>

                {/* Main Perfume Bottle - behind text */}
                <div
                    data-scroll
                    data-scroll-speed="-2"
                    className="absolute z-10 top-[10%] sm:top-[5%] right-[10%] sm:right-[10%] transform translate-x-[-10%] pointer-events-none"
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
                    data-scroll-direction="horizontal"
                    className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
                >
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-30 blur-[2px] absolute aroma"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                {/* Centered Text Content (pushed a little higher) */}
                <div
                    data-scroll
                    data-scroll-speed="-1"
                    className="relative z-20 flex flex-col -mt-12 sm:-mt-20 md:-mt-24 lg:-mt-28 items-center justify-center text-center px-4 max-w-[90%]"
                >
                    <h1
                        data-scroll
                        data-scroll-speed="-0.3"
                        className="headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Inter] font-thin tracking-wide mb-4"
                    >
                        Give your mood an aroma
                    </h1>
                    <p
                        data-scroll
                        data-scroll-speed="-0.3"
                        className="text-lg sm:text-xl md:text-2xl font-[Hepta Slab] font-thin tracking-wider max-w-xl"
                    >
                        Perfumes that turn heads raise eyebrows
                    </p>
                    <button
                        data-scroll
                        data-scroll-speed="-2"
                        className="mt-6 font-[Inter] px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition text-sm sm:text-base"
                    >
                        Shop Now
                    </button>
                </div>
            </section>
        </div>
    );

};

export default Fluxbottleanimation;
