import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/collections", label: "Collections" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`w-full bg-transparent text-gray-200 backdrop-blur-md shadow-sm font-[Poppins] fixed top-0 left-0 z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-4">
          <img
            src="src/assets/ChatGPT_Image_Jul_21__2025__05_32_17_PM-removebg-preview.png"
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 text-lg font-semibold tracking-wide">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `transition duration-300 hover:text-[#FFD700] ${
                  isActive ? "text-[#FFD700]" : "text-gray-200"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <div
          className="md:hidden text-gray-200 text-3xl cursor-pointer"
          onClick={toggleMobileMenu}
        >
          ☰
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-gray-200 px-6 py-4 space-y-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsMobileMenuOpen(false)} // close menu after click
              className={({ isActive }) =>
                `block transition duration-300 hover:text-[#FFD700] ${
                  isActive ? "text-[#FFD700]" : "text-gray-200"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
