import { useRef, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Fluxbottleanimation from "../Components/Homepagecomponents/heropageanimation";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
  const scrollRef = useRef(null);
  const { darkMode } = useTheme();

  // Setup Lenis on mount
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToSection = () => {
    const target = document.getElementById("scrollTarget");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={scrollRef}
      className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Fluxbottleanimation />

      {/* Scroll Button */}
      <section className="min-h-screen flex items-center justify-center">
        <button
          onClick={scrollToSection}
          className="px-6 py-2 border rounded-full hover:scale-105 transition"
        >
          Scroll to Section
        </button>
      </section>

      {/* Scroll Target Section */}
      <section
        id="scrollTarget"
        className="h-[100vh] flex items-center justify-center bg-gray-200 dark:bg-gray-800"
      >
        <h2 className="text-4xl">Target Section</h2>
      </section>
    </div>
  );
};

export default Home;
