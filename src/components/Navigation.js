import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "../constants";

/**
 * Navigation component with responsive design and smooth scrolling
 * @param {Object} props - Component props
 * @param {boolean} props.isMenuOpen - Mobile menu open state
 * @param {Function} props.toggleMenu - Function to toggle mobile menu
 * @param {Function} props.scrollToSection - Function to scroll to section
 * @param {boolean} props.isScrolled - Whether page has been scrolled
 * @returns {JSX.Element} Navigation component
 */
const Navigation = ({ isMenuOpen, toggleMenu, scrollToSection, isScrolled }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/unicorn.png" 
              alt="Unicorn logo" 
              className="w-8 h-8"
            />
            <span className="ml-2 font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tiffany Hall
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {isHomePage && NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-700 hover:text-purple-600 transition-colors capitalize font-medium"
              >
                {item}
              </button>
            ))}
            {!isHomePage && (
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Home
              </Link>
            )}
            <Link
              to="/blog"
              className={`transition-colors font-medium ${
                location.pathname === "/blog"
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Blog
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="mailto:tiffanycodes.co@gmail.com?subject=Let's be awesome together, Tiffany!"
              className="bg-gradient-to-r from-purple-700 to-pink-700 text-white px-6 py-2 rounded-full hover:from-purple-800 hover:to-pink-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-block text-decoration-none"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 p-2"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
        >
          <div className="px-4 py-3 space-y-3">
            {isHomePage && NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 capitalize"
              >
                {item}
              </button>
            ))}
            {!isHomePage && (
              <Link
                to="/"
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600"
                onClick={() => toggleMenu()}
              >
                Home
              </Link>
            )}
            <Link
              to="/blog"
              className={`block w-full text-left px-3 py-2 transition-colors ${
                location.pathname === "/blog"
                  ? "text-purple-600"
                  : "text-gray-700 hover:text-purple-600"
              }`}
              onClick={() => toggleMenu()}
            >
              Blog
            </Link>
            <a
              href="mailto:tiffanycodes.co@gmail.com?subject=Let's be awesome together, Tiffany!"
              className="w-full mt-3 bg-gradient-to-r from-purple-700 to-pink-700 text-white px-6 py-2 rounded-full hover:from-purple-800 hover:to-pink-800 transition-all duration-300 inline-block text-center text-decoration-none"
            >
              Let's Connect
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

Navigation.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  scrollToSection: PropTypes.func.isRequired,
  isScrolled: PropTypes.bool.isRequired,
};

export default React.memo(Navigation);