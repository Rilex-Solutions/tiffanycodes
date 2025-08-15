import React from "react";
import { Menu, X } from "lucide-react";

const Navigation = ({ isMenuOpen, toggleMenu, scrollToSection, isScrolled }) => {
  const navItems = ["services", "portfolio", "about", "contact"];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <img 
              src="/images/unicorn.png" 
              alt="Unicorn logo" 
              className="w-8 h-8"
            />
            <span className="ml-2 font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tiffany Hall
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-700 hover:text-purple-600 transition-colors capitalize font-medium"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-purple-700 to-pink-700 text-white px-6 py-2 rounded-full hover:from-purple-800 hover:to-pink-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Let's Connect
            </button>
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
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 capitalize"
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full mt-3 bg-gradient-to-r from-purple-700 to-pink-700 text-white px-6 py-2 rounded-full hover:from-purple-800 hover:to-pink-800 transition-all duration-300"
            >
              Let's Connect
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;