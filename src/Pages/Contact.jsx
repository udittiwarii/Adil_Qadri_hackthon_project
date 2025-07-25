import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaEnvelope, FaPhoneAlt, FaLocationArrow } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br mt-20 from-[#000000] to-[#1a1a1a] text-white py-16 px-6 md:px-16 font-sans">
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold text-center mb-12 tracking-wide"
      >
        Get in Touch with <span className="text-[#f4c430]">Adil Qadri</span>
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#111] rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-lg bg-[#1f1f1f] text-white placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-lg bg-[#1f1f1f] text-white placeholder-gray-400"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="p-3 rounded-lg bg-[#1f1f1f] text-white placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-[#f4c430] text-black py-3 rounded-lg hover:bg-yellow-400 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Contact Details */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#111] rounded-2xl p-8 shadow-lg flex flex-col justify-between"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reach Us</h2>
            <div className="flex items-center gap-4 mb-4">
              <FaLocationArrow className="text-[#f4c430]" />
              <span>Adil Qadri Office, Surat, Gujarat, India</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FaPhoneAlt className="text-[#f4c430]" />
              <a href="tel:+917575070707" className="hover:underline">
                +91 75750 70707
              </a>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FaEnvelope className="text-[#f4c430]" />
              <a
                href="mailto:support@adilqadri.com"
                className="hover:underline"
              >
                support@adilqadri.com
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-6 text-xl">
              <a
                href="https://www.instagram.com/adilqadrifragrances"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f4c430] transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/adilqadrifragrance"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f4c430] transition"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
