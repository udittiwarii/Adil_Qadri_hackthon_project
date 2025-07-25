import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import { BsSun, BsMoon } from "react-icons/bs";
import { IoArrowBack } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Smooth scroll init
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  const handleLogin = () => {
    if (email && password) {
      const user = { email, loginTime: Date.now() };
      localStorage.setItem("user", JSON.stringify(user));
      if (remember) {
        localStorage.setItem("remember", "true");
      }
      navigate("/collection");
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-blue-100 to-purple-100 text-gray-800"
      }`}
    >
      {/* Back Button + Mode Toggle */}
      <div className="absolute top-4 left-4 flex gap-4 items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white shadow hover:scale-105 transition dark:bg-gray-700 dark:text-white"
        >
          <IoArrowBack size={20} />
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white shadow hover:rotate-180 transition dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
        </button>
      </div>

      <div className="flex w-[90%] max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
        {/* Left Side */}
        <motion.div
          className="w-1/2 p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/logo.png" alt="logo" className="w-16 mb-4" />

          <h2 className="text-xl font-semibold mb-1">EMAIL</h2>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 mb-4 border-b bg-transparent outline-none dark:text-white"
          />

          <h2 className="text-xl font-semibold mb-1">PASSWORD</h2>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 mb-4 border-b bg-transparent outline-none dark:text-white"
          />

          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" onChange={() => setRemember(!remember)} />
            <label className="text-sm">Remember Me</label>
          </div>

          <button
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
          >
            LOGIN
          </button>

          <p className="text-sm mt-6">
            Forgotten your login details?{" "}
            <span className="text-blue-600 cursor-pointer">
              Get Help Signing In
            </span>
          </p>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="w-1/2 bg-gradient-to-br from-purple-500 to-blue-500 text-white p-10 flex flex-col justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg mb-2">WELCOME TO</h3>
          <h1 className="text-3xl font-bold mb-4">AdilQadri</h1>
          <p className="text-sm">Login to Access Dashboard</p>
        </motion.div>
      </div>
    </div>
  );
}
