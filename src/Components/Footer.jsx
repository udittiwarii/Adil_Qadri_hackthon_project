import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          scrub: true
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-gray-200 px-5 py-12 sm:px-10 md:px-20 lg:px-32 rounded-t-3xl mt-20"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Adil Qadri</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xs">
            Discover our luxurious perfume collections and timeless fragrances.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/collections" className="hover:text-white">Collections</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-3">
            support@adilqadri.com
          </p>
          <div className="flex gap-5 text-xl text-gray-300 mt-2">
            <a href="#"><FaInstagram className="hover:text-white transition" /></a>
            <a href="#"><FaFacebookF className="hover:text-white transition" /></a>
            <a href="#"><FaTwitter className="hover:text-white transition" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-xs sm:text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} Adil Qadri. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
