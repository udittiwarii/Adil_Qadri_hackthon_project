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

        // Bottle entrance
        gsap.from(".perfume-bottle", {
            opacity: 0,
            y: 100,
            rotateX: 90,
            duration: 1.8,
            ease: "power4.out",
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

        // Floating animation
        gsap.to(".perfume-bottle", {
            y: "+=20",
            repeat: -1,
            yoyo: true,
            duration: 4,
            ease: "sine.inOut",
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
            <section className="relative min-h-screen bg-black text-white overflow-hidden">

                {/* 🌫 Blurred Background Bottle */}
                <div className="absolute inset-0 z-0 flex items-center justify-center">
                    <img
                        src="src/assets/Flux_Dev_a_lavish_highly_detailed_3D_render_of_a_luxury_perfum_3-removebg-preview.png"
                        alt="Blurred Bottle"
                        className="h-[600px] filter blur-[25px] opacity-60 brightness-125"
                    />
                </div>

                {/* 🧴 Foreground Bottle (Top Right) */}
                <div className="absolute z-10 top-10 right-10 pointer-events-none">
                    <img
                        src="src/assets/Flux_Dev_a_lavish_highly_detailed_3D_render_of_a_luxury_perfum_3-removebg-preview.png"
                        alt="Perfume Bottle"
                        className="perfume-bottle h-[500px] opacity-60"
                    />
                </div>

                {/* 🌸 Aroma Particles */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-white opacity-30 blur-[2px] absolute animate-float"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Text Content */}
                <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4">
                    <h1 className="text-5xl font-bold mb-4">Introducing The Essence</h1>
                    <p className="text-xl max-w-xl">
                        Feel the luxury in every breath. Discover the new fragrance from Flux.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition">
                        Shop Now
                    </button>
                </div>
            </section>

            {/* SECTION 2 */}
            <section className="min-h-screen bg-black text-white flex items-center justify-center">
                <h2 className="text-4xl font-semibold">Scroll Down</h2>
            </section>
        </div>
    );
};

export default Fluxbottleanimation;
