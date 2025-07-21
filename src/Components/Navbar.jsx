import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full bg-transparent text-white backdrop-blur-md shadow-sm font-[Poppins] fixed top-0 left-0 z-50 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-10">
          <img
            src="src/assets/ChatGPT_Image_Jul_21__2025__05_32_17_PM-removebg-preview.png"
            alt="Logo"
            className="h-20 w-auto object-contain"
          />
        </NavLink>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-8 text-lg font-semibold tracking-wide">
          {[
            { to: "/", label: "Home" },
            { to: "/collections", label: "Collections" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `transition duration-300 hover:text-[#FFD700] ${
                  isActive ? "text-[#FFD700]" : "text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Icon Placeholder */}
        <div className="md:hidden text-white text-2xl font-bold">☰</div>
      </div>
    </nav>
  );
};

export default Navbar;
