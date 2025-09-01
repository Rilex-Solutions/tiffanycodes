import { useState, useEffect } from 'react';

/**
 * Custom hook to track the active section using Intersection Observer
 * @param {Array} sectionIds - Array of section IDs to observe
 * @param {boolean} disabled - Whether to disable active tracking
 * @returns {string} - Currently active section ID (empty string if disabled)
 */
export const useActiveSection = (sectionIds, disabled = true) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Return early if disabled
    if (disabled) {
      setActiveSection('');
      return;
    }

    const observers = [];
    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean); // Remove any null elements

    if (sectionElements.length === 0) return;

    // Create intersection observer for each section
    sectionElements.forEach((section) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Section is in view
              setActiveSection(entry.target.id);
            }
          });
        },
        {
          root: null, // Use viewport as root
          rootMargin: '-20% 0px -60% 0px', // Adjust when section is considered "active"
          threshold: 0.2 // Trigger when 20% of section is visible
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    // Cleanup function
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionIds, disabled]);

  return activeSection;
};