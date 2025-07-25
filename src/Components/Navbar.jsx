import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { toast } from "react-toastify";
import logo from "../assets/ChatGPT_Image_Jul_21__2025__05_32_17_PM-removebg-preview.png";
import defaultMale from "../assets/2.webp";
import defaultFemale from "../assets/3.webp";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navRef = useRef([]);

  const genderBasedAvatar =
    user?.avatarUrl ||
    (user?.gender === "female" ? defaultFemale : defaultMale);

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

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 bg-transparent text-white backdrop-blur-md ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-lg font-semibold">
          {navLinks.map(({ to, label }, index) => (
            <NavLink
              key={to}
              to={to}
              ref={(el) => (navRef.current[index] = el)}
              className={({ isActive }) =>
                `transition hover:text-yellow-400 ${isActive ? "text-yellow-500" : "text-gray-200"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right Side: Avatar / Auth */}
        <div className="flex items-center gap-4 relative">
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
                onClick={handleProfileClick}
                className="h-10 w-10 rounded-full border-2 border-white cursor-pointer"
              />
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md text-sm w-40 z-50">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger Icon for Mobile */}
          <div
            className="md:hidden text-3xl cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block text-lg font-semibold hover:text-yellow-400 ${isActive ? "text-yellow-500" : "text-white"}`
              }
            >
              {label}
            </NavLink>
          ))}
          {!isLoggedIn ? (
            <button
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
              className="text-white w-full text-left mt-4 hover:underline"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left block w-full mt-4 text-red-500 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
