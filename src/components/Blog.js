import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Components
import Navigation from "./Navigation";
import BlogCard from "./BlogCard";
import BlogModal from "./BlogModal";

// Data
import { blogPosts } from "../data/blogPosts";

// Constants
import { SCROLL_THRESHOLD } from "../constants";

const Blog = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const handleOpenModal = async (post) => {
    setSelectedPost(post);
    setLoadingContent(true);
    setModalContent(null);
    
    try {
      const response = await fetch(`/blog/posts/${post.slug}.json`);
      const data = await response.json();
      setModalContent(data.content);
    } catch (error) {
      console.error('Failed to load blog content:', error);
      setModalContent('Failed to load content. Please try again.');
    } finally {
      setLoadingContent(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalContent(null);
    setLoadingContent(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navigation 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={() => {}}
        isScrolled={isScrolled}
      />

      <section className="hero-section pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <header className="space-y-6">
              <h1 className="hero-title">
                <span className="gradient-text-purple">TiffanyCodes</span>
              </h1>
              
              <p className="hero-description mx-auto max-w-2xl">
                Crafting thoughts, tutorials, and insights with the same care I put into code.
              </p>
            </header>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onOpenModal={handleOpenModal}
              />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/" className="btn-primary">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>

      <BlogModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={handleCloseModal}
        content={modalContent}
        loadingContent={loadingContent}
      />
    </div>
  );
};

export default Blog;