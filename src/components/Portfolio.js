import React, { useState, useEffect, useCallback } from "react";
import { MapPin, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

// Components
import Navigation from "./Navigation";
import ServiceCard from "./ServiceCard";
import ProjectCard from "./ProjectCard";
import ResumeCard from "./ResumeCard";
import RotatingTitles from "./RotatingTitles";

// Data
import { personalInfo } from "../data/personal";
import { services } from "../data/services";
import { projects } from "../data/projects";
import { resumes, resumeSection } from "../data/resumes";

// Constants
import { SCROLL_THRESHOLD } from "../constants";

// Styles
import "../App.css";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navigation 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        scrollToSection={scrollToSection}
        isScrolled={isScrolled}
      />

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <main className="space-y-8">
              <aside className="availability-badge">
                <MapPin size={16} className="mr-2" />
                Available for remote work
              </aside>

              <header className="space-y-6">
                <h1 className="hero-title">
                  <RotatingTitles />
                  <br />
                  <span className="gradient-text-purple">Building Digital</span>
                  <br />
                  <span className="gradient-text-teal">Experiences</span>
                </h1>

                <p className="hero-description">
                  Crafting modern web applications with clean code, thoughtful design, 
                  and seamless user experiences.
                </p>
              </header>

              <nav className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("portfolio")}
                  className="btn-primary group"
                >
                  View My Work
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="mailto:tiffanycodes.co@gmail.com?subject=Let's be awesome together, Tiffany!"
                  className="btn-secondary"
                >
                  Get In Touch
                </a>
              </nav>

              <ul className="flex space-x-6">
                <li>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub Profile (opens in new tab)">
                    <Github size={24} />
                  </a>
                </li>
                <li>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn Profile (opens in new tab)">
                    <Linkedin size={24} />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${personalInfo.email}`} className="social-link" aria-label="Send Email">
                    <Mail size={24} />
                  </a>
                </li>
              </ul>
            </main>

            {/* Profile Image */}
            <aside className="relative">
              <div className="animated-dots" aria-hidden="true" />
              <figure className="profile-image-container">
                <img
                  src="/images/TiffanyHall.png"
                  alt="Tiffany is a joyful unicorn that loves to knit and code."
                  className="profile-image"
                />
              </figure>
            </aside>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-12">
            <article className="space-y-8">
              <header>
                <h2 className="section-title">About Me</h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Hey there! I'm Tiffany – the Full Stack Developer who brings 15+ years of educational leadership superpowers to every project I touch.
                  </p>
                  <p>
                    Think of me as your technical translator: I take complex problems, sprinkle in some creative magic, and deliver solutions that make users go "wow, this actually makes sense!" From architecting literacy platforms serving thousands of students nationwide to hosting 40+ live coding showcases, I'm equally at home debugging Ruby on Rails backends and cheering on bootcamp students as they tackle their first algorithms.
                  </p>
                  <p>
                    I've spent years in special education classrooms, which means I'm practically a wizard at making technology accessible, intuitive, and genuinely helpful. I don't just write code – I craft experiences that work for everyone, including the users most other developers forget about.
                  </p>
                  <p>
                    Currently available for exciting new opportunities while continuing as a Technical Livestream Host and building custom websites and applications for clients, because why choose one passion when you can excel at multiple? I'm the person who gets genuinely excited about sprint planning, celebrates every successful deployment, and believes that the best technology is the kind that feels like it was built just for you.
                  </p>
                </div>
              </header>
            </article>
            
            <aside className="relative">
              <div className="contact-card">
                <header className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Let's Connect!</h3>
                  <p className="text-gray-600">
                    Available for remote opportunities and exciting projects.
                  </p>
                  <address className="space-y-4 not-italic">
                    <div className="contact-info">
                      <Mail size={20} className="text-purple-600" />
                      <span className="font-medium">{personalInfo.email}</span>
                    </div>
                    <div className="contact-info">
                      <MapPin size={20} className="text-purple-600" />
                      <span>{personalInfo.location}</span>
                    </div>
                  </address>
                </header>
              </div>
            </aside>
          </div>
          
          <section className="skills-container" aria-label="Key Achievements">
            {[
              "AWS Cloud Practitioner Certified",
              "Professional Scrum Master I", 
              "40+ Live Coding Showcases Hosted",
              "Literacy Platforms Serving Thousands",
              "2,100+ Monthly Visitors Generated",
              "Full-Stack Custom E-commerce Solutions",
              "CI/CD Pipelines & Microservices",
              "15+ Years Educational Leadership"
            ].map((achievement) => (
                <span key={achievement} className="skill-tag">{achievement}</span>
              ))
            }
          </section>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="section-title">{resumeSection.title} ✨</h2>
            <p className="section-description">
              {resumeSection.subtitle}
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {resumes.map((resume, index) => (
              <li key={index}>
                <ResumeCard resume={resume} />
              </li>
            ))}
          </ul>

          <footer className="text-center">
            <p className="text-gray-600 text-sm">
              {resumeSection.microCopy}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              All versions available in PDF format • Updated August 2025
            </p>
          </footer>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="section-title">What I Do</h2>
            <p className="section-description">
              I specialize in creating end-to-end digital solutions that combine 
              technical excellence with user-centered design
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <li key={index}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              A showcase of recent projects demonstrating technical skills and creative problem-solving
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <li key={index}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer/Contact */}
      <footer id="contact" className="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12">
            <h2 className="footer-title">I'm awesome! You're awesome!</h2>
            <h2 className="footer-title"> Let's be awesome together!</h2>
          </header>

          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-4">
                <span className="text-2xl font-bold">Tiffany Hall</span>
              </div>
              <p className="text-purple-200 mb-4">
                Full Stack Developer, Technical Product Owner, & Technical Livestream and Event Host
              </p>
              <address className="text-purple-300 text-sm not-italic">{personalInfo.email}</address>
            </div>

            <nav aria-label="Social Media Links">
              <ul className="flex space-x-6">
                <li>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub Profile (opens in new tab)">
                    <Github size={24} />
                  </a>
                </li>
                <li>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn Profile (opens in new tab)">
                    <Linkedin size={24} />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${personalInfo.email}`} className="footer-social" aria-label="Send Email">
                    <Mail size={24} />
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="text-center mb-6">
            <p className="text-purple-300 text-sm">
              Public repositories showcase learning projects. Client work maintained privately.
            </p>
          </div>

          <div className="border-t border-purple-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              {/* Copyright */}
              <small className="text-purple-200 text-sm">
                © 2025 TiffanyCodes
              </small>
              
              {/* WCAG Compliance Badge */}
              <div className="wcag-compliance-badge">
                <div className="flex items-center space-x-2">
                  <div className="accessibility-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="6" r="1" fill="currentColor"/>
                      <path d="M8 14l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="wcag-badge-small">WCAG 2.0 AA</span>
                    <span className="wcag-compliant-small">Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(Portfolio);