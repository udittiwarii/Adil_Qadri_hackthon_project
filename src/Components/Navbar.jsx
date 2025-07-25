import { useEffect, useRef, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-toastify";
import { BsMoonStars, BsSun } from "react-icons/bs";

import logo from "../assets/ChatGPT_Image_Jul_21__2025__05_32_17_PM-removebg-preview.png";
import defaultMale from "../assets/2.webp";
import defaultFemale from "../assets/3.webp";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  // const { toggleTheme } = useContext(ThemeContext);
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navRef = useRef([]);

  const genderBasedAvatar =
    user?.avatarUrl || (user?.gender === "female" ? defaultFemale : defaultMale);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (showNavbar && window.innerWidth >= 768) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  }, [showNavbar]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 backdrop-blur-md ${darkMode ? "bg-black/80 text-white" : "bg-white/80 text-black"
        } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-19 w-auto object-contain" />
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-lg font-semibold">
          {navLinks.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              ref={(el) => (navRef.current[i] = el)}
              className={({ isActive }) =>
                `transition hover:text-yellow-400 ${darkMode ? "text-gray-200" : "text-gray-700"
                } ${isActive ? "text-yellow-500" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn && (
            <>
              <NavLink to="/cart" className="hover:text-yellow-400 transition">
                🛒 Cart
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side: Avatar or Auth + Toggle */}
        <div className="flex items-center gap-4 relative">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="w-12 h-6 flex items-center px-1 bg-gray-300 dark:bg-gray-700 rounded-full relative"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-6" : "translate-x-0"
                } flex items-center justify-center`}
            >
              {darkMode ? (
                <BsSun className="text-yellow-400 text-xs" />
              ) : (
                <BsMoonStars className="text-blue-600 text-xs" />
              )}
            </div>
          </button>

          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 px-4 py-1.5 text-black font-semibold rounded hover:bg-yellow-300 transition"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <img
                src={genderBasedAvatar}
                alt="User Avatar"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="h-10 w-10 rounded-full border-2 border-white cursor-pointer object-cover"
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md text-sm w-44 z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    👤 View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <div
            className="md:hidden text-3xl cursor-pointer"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden ${darkMode ? "bg-black text-white" : "bg-white text-black"
          } px-6 py-4 space-y-4`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block text-lg font-semibold hover:text-yellow-400 ${isActive ? "text-yellow-500" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {isLoggedIn ? (
            <>
              <NavLink
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-yellow-400"
              >
                🛒 Cart
              </NavLink>
              
              <button
                onClick={handleLogout}
                className="text-left block w-full mt-4 text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left mt-4 hover:underline"
            >
              Sign In
            </button>
          )}
          ;
        </div>
      )}
    </nav>
  );
};

export default Navbar;
