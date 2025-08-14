import React from "react";

const ServiceCard = ({ service }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      purple: {
        bg: "from-purple-100 to-pink-100",
        text: "text-purple-600"
      },
      teal: {
        bg: "from-teal-100 to-purple-100", 
        text: "text-teal-600"
      },
      pink: {
        bg: "from-pink-100 to-purple-100",
        text: "text-pink-600"
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  const colors = getColorClasses(service.color);

  return (
    <div className="group p-8 rounded-2xl border border-gray-100 hover:border-purple-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white">
      {/* Icon */}
      <div className={`w-14 h-14 bg-gradient-to-r ${colors.bg} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <service.icon className={colors.text} size={24} />
      </div>

      {/* Content */}
      <h3 className="font-bold text-gray-900 mb-3 text-center">
        {service.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 text-center leading-relaxed">
        {service.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 justify-center">
        {service.technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Certification Badge */}
      {service.certification && (
        <div className="mt-4 text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 rounded-lg border border-green-200">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg">🏆</span>
              <span className="font-semibold text-xs">
                {service.certification}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;