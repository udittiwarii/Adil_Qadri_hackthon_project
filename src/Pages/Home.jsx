import { useRef, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Fluxbottleanimation from "../Components/Homepagecomponents/heropageanimation";
import Heroswiper from "../Components/Homepagecomponents/heroswiper";
import { useTheme } from "../context/ThemeContext";
import imgset from "../assets/RoyalAttar/EMP06101.webp"
const Home = () => {
  const pageRef = useRef(null); // For Lenis
  const aboutRef = useRef(null); // For scroll tracking
  const { darkMode, theme, toggleTheme } = useTheme();

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

  // Framer Motion scroll animations for about section
  const { scrollYProgress } = useScroll({ target: aboutRef });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div
      ref={pageRef}
      className={`${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <Fluxbottleanimation />
      <Heroswiper />
      

      {/* About Section */}
      <div
        ref={aboutRef}
        className={`relative overflow-hidden min-h-screen transition-colors duration-300 ${
          theme === "dark" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
      
        {/* Parallax Background */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-br from-purple-600 to-pink-400 opacity-20 blur-3xl z-0"
        />

        {/* Header Content */}
        <div className="relative z-10 px-6 md:px-16 py-24">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About{" "}
            <span className="text-purple-600 dark:text-pink-400">
              Adil Qadri
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg md:text-xl max-w-3xl"
          >
            Adil Qadri is not just a brand — it's a lifestyle. With a passion
            for premium fragrances and a mission to deliver excellence, Adil
            Qadri has become a symbol of luxury, tradition, and elegance.
          </motion.p>
        </div>

        {/* Image and Description */}
        <motion.div
          style={{ y: y2 }}
          className="relative z-10 px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-10"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            src={imgset}
            alt="Adil Qadri"
            className="w-full md:w-1/2 rounded-xl shadow-xl"
          />

          <div className="text-lg md:text-xl md:w-1/2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="mb-6"
            >
              From classic attars to modern perfumes, each product is crafted
              with care and inspired by the rich legacy of Arabic fragrance
              culture. With a commitment to quality, Adil Qadri offers timeless
              scents that leave a lasting impression.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              Join the journey of sophistication. Be a part of the fragrance
              revolution.
            </motion.p>
          </div>
        </motion.div>

        {/* Bottom Parallax Effect */}
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-tr from-pink-500 to-purple-600 opacity-30 blur-2xl z-0"
        />
      </div>
    </div>
  );
};

export default Home;
