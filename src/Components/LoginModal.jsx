import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

const LoginModal = ({ visible, onClose }) => {
  const { login } = useAuth();
  const { darkMode } = useTheme();

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "auto";
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className={`relative rounded-full w-96 h-96 flex items-center justify-center shadow-lg transition-colors duration-300
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
      >
        <button
          onClick={onClose}
          className={`absolute top-2 right-2 text-2xl transition-colors
          ${darkMode ? "text-white" : "text-black"}`}
        >
          ×
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <button
            onClick={() => {
              login();
              onClose();
            }}
            className={`px-6 py-2 rounded-full transition-all duration-300
            ${darkMode ? "bg-white text-black" : "bg-black text-white"}`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
