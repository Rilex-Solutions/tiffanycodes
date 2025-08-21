import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './RotatingTitles.css';

/**
 * RotatingTitles Component
 * 
 * Displays job titles with smooth 3D rotation animation inline with hero text.
 * Based on CodePen: https://codepen.io/weerth/pen/qBoRzRQ
 * 
 * Features:
 * - 12-second animation cycle with pauses for readability
 * - Responsive design (desktop → mobile)
 * - Accessibility support (respects prefers-reduced-motion)
 * - Performance optimized with CSS transforms
 * 
 * @param {Object} props - Component props
 * @param {string[]} [props.titles] - Array of titles to rotate through
 * @param {number} [props.animationDuration] - Animation duration in seconds
 * @returns {JSX.Element} RotatingTitles component
 */
const RotatingTitles = ({ 
  titles = ['Full Stack Developer', 'EdTech Consultant', 'Product Owner'],
  animationDuration = 12 
}) => {
  // Memoize titles to prevent unnecessary re-renders
  const memoizedTitles = useMemo(() => titles, [titles]);

  return (
    <div className="rotating-stage" aria-live="polite">
      <div 
        className="rotating-cubespinner"
        style={{ 
          animationDuration: `${animationDuration}s`,
          '--animation-duration': `${animationDuration}s`
        }}
      >
        {memoizedTitles.map((title, index) => (
          <div 
            key={`rotating-title-${index}`}
            className={`rotating-face rotating-face-${index + 1}`}
            aria-hidden={index !== 0} // Only first title visible to screen readers
          >
            {title}
          </div>
        ))}
      </div>
      
      {/* Screen reader fallback - shows all titles */}
      <span className="sr-only">
        {memoizedTitles.join(', ')}
      </span>
    </div>
  );
};

RotatingTitles.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
  animationDuration: PropTypes.number,
};

export default React.memo(RotatingTitles);