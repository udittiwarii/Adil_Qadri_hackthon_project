import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

const LoginModal = ({ visible, onClose }) => {
  const { login } = useAuth();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative bg-white rounded-full w-96 h-96 flex items-center justify-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-black"
        >
          ×
        </button>
        <div className="text-black text-center">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <button
            onClick={() => {
              login();
              onClose();
            }}
            className="bg-black text-white px-6 py-2 rounded-full"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
