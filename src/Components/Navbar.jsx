import { NavLink } from "react-router-dom";
import logo from "../assets/ChatGPT Image Jul 21, 2025, 03_42_11 PM.png"; // ✅ Correct relative path

const Navbar = () => {
  return (
    <nav className="w-full bg-transparent text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-10 object-contain" />
          <span className="text-[#FFD700] text-xl font-bold tracking-wide font-[Playfair Display]">
            ADIL QADRI
          </span>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex space-x-10 text-sm tracking-wide uppercase">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-[#FFD700] transition duration-200 ${
                isActive ? "text-[#FFD700]" : "text-gray-300"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/collections"
            className={({ isActive }) =>
              `hover:text-[#FFD700] transition duration-200 ${
                isActive ? "text-[#FFD700]" : "text-gray-300"
              }`
            }
          >
            Collections
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-[#FFD700] transition duration-200 ${
                isActive ? "text-[#FFD700]" : "text-gray-300"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-[#FFD700] transition duration-200 ${
                isActive ? "text-[#FFD700]" : "text-gray-300"
              }`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
