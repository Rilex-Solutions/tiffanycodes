import React from "react";
import { Link } from "react-router-dom";

/**
 * Blog page component
 * @returns {JSX.Element} Blog page
 */
const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
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

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 transition-colors font-medium"
              >
                Home
              </Link>
              <span className="text-purple-600 font-medium">
                Blog
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            TiffanyCodes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights from a developer who believes in adding a little sparkle to everything.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center py-20">
          <div className="inline-block p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Blog Coming Soon!
            </h2>
            <p className="text-gray-600 mb-6">
              I'm working on bringing you amazing content. Stay tuned for tutorials, 
              insights, and maybe a few sparkly surprises.
            </p>
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;