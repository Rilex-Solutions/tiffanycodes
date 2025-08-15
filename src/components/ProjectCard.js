import React from "react";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
  const handleCardClick = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
        project.url ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={project.url ? 0 : -1}
      role={project.url ? "button" : undefined}
      aria-label={project.url ? `View ${project.title} project (opens in new tab)` : undefined}
    >
      {/* Image/Gradient Header */}
      <div className={`h-48 relative overflow-hidden ${
        project.image ? 'bg-gray-100' : `bg-gradient-to-br ${project.gradient}`
      }`}>
        {project.image && (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        {project.url && (
          <div className="absolute bottom-4 right-4">
            <ExternalLink
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              size={20}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;