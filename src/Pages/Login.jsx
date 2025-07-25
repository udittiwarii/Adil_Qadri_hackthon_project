import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    const isLogin = localStorage.getItem("user");
    if (isLogin) {
      navigate("/collection");
    }
  }, [navigate]);

  const handleLogin = () => {
    if (email && password) {
      const user = { email, loginTime: Date.now() };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/collection");
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? "bg-gradient-to-br from-gray-800 to-black" : "bg-gradient-to-br from-blue-100 to-purple-100"}`}>
      <div className={`flex w-[90%] max-w-5xl shadow-2xl rounded-2xl overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#111]" : "bg-white"}`}>

        {/* Left Side */}
        <motion.div
          className="w-1/2 p-10 flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-xl font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>EMAIL</h2>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-2 mb-4 border-b outline-none transition-all duration-300 ${darkMode ? "bg-transparent text-white border-gray-600" : "text-gray-700"}`}
          />

          <h2 className={`text-xl font-semibold mb-1 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>PASSWORD</h2>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-2 mb-4 border-b outline-none transition-all duration-300 ${darkMode ? "bg-transparent text-white border-gray-600" : "text-gray-700"}`}
          />

          <div className="flex gap-4">
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition"
            >
              LOGIN
            </button>
          </div>

          <p className={`text-sm mt-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Forgotten your login details?{" "}
            <span className="text-blue-600 cursor-pointer">Get Help Signing In</span>
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
