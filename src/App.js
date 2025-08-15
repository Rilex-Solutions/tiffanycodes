import React, { useState, useEffect } from "react";
import { MapPin, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

import Navigation from "./components/Navigation";
import ServiceCard from "./components/ServiceCard";
import ProjectCard from "./components/ProjectCard";
import { personalInfo } from "./data/personal";
import { services } from "./data/services";
import { projects } from "./data/projects";
import "./App.css";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

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
                  Full Stack Developer
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
                <button
                  onClick={() => scrollToSection("contact")}
                  className="btn-secondary"
                >
                  Get In Touch
                </button>
              </nav>

              <ul className="flex space-x-6" role="list">
                <li>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub Profile">
                    <Github size={24} />
                  </a>
                </li>
                <li>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn Profile">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
              
              <section className="skills-container" aria-label="Core Technologies">
                {["JavaScript", "React", "Node.js", "TypeScript", "Python", "PostgreSQL", "MongoDB", "Tailwind CSS"]
                  .map((skill) => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))
                }
              </section>
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
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="section-title">What I Do</h2>
            <p className="section-description">
              I specialize in creating end-to-end digital solutions that combine 
              technical excellence with user-centered design
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {services.map((service, index) => (
              <li key={index}>
                <ServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              A showcase of recent projects demonstrating technical skills and creative problem-solving
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
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
            <h2 className="footer-title">I'm awesome! You're awesome! Let's be awesome together!</h2>
            <p className="footer-description">
              Ready to bring your ideas to life? Let's discuss your next project!
            </p>
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
              <ul className="flex space-x-6" role="list">
                <li>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="GitHub Profile">
                    <Github size={24} />
                  </a>
                </li>
                <li>
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn Profile">
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

          <div className="border-t border-purple-800 pt-8 text-center">
            <small className="text-purple-200 text-sm">
              © 2025 TiffanyCodes
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;