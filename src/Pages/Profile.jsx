import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const goBack = () => {
    navigate(-1);
  };

  // Optional Lenis scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="absolute top-6 left-6 bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Card */}
      <motion.div
        className="bg-gray-800/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6 text-center border border-gray-700"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          👤 Your Profile
        </motion.h2>

        <motion.div
          className="space-y-2 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            <strong className="text-gray-400">Username:</strong>{" "}
            {user?.username || "N/A"}
          </p>
          <p>
            <strong className="text-gray-400">Logged in at:</strong>{" "}
            {user?.loginTime
              ? new Date(user.loginTime).toLocaleString()
              : "N/A"}
          </p>
        </motion.div>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-300"
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;
