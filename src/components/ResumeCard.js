import React from "react";
import PropTypes from "prop-types";
import { Download, Eye } from "lucide-react";

/**
 * ResumeCard component displays resume version with view/download options
 * @param {Object} props - Component props
 * @param {Object} props.resume - Resume data object
 * @param {React.Component} props.resume.icon - Icon component
 * @param {string} props.resume.title - Resume title
 * @param {string} props.resume.description - Resume description
 * @param {string} props.resume.color - Color theme for the card
 * @param {string} props.resume.viewUrl - URL to view resume
 * @param {string} props.resume.downloadUrl - URL to download PDF
 * @param {string} props.resume.filename - PDF filename for download
 * @returns {JSX.Element} ResumeCard component
 */
const ResumeCard = ({ resume }) => {
  const getColorClasses = (color) => {
    const colorMap = {
      purple: {
        bg: "from-purple-200 to-purple-300",
        text: "text-purple-700",
        button: "from-purple-900 to-purple-600 hover:from-purple-950 hover:to-purple-700"
      },
      teal: {
        bg: "from-teal-200 to-teal-300", 
        text: "text-teal-700",
        button: "from-teal-900 to-teal-600 hover:from-teal-950 hover:to-teal-700"
      },
      pink: {
        bg: "from-pink-200 to-pink-300",
        text: "text-pink-700",
        button: "from-pink-900 to-pink-600 hover:from-pink-950 hover:to-pink-700"
      }
    };
    return colorMap[color] || colorMap.purple;
  };

  const colors = getColorClasses(resume.color);

  const handleView = () => {
    if (resume.viewUrl) {
      window.open(resume.viewUrl, '_blank');
    }
  };

  const handleDownload = () => {
    if (resume.downloadUrl) {
      const link = document.createElement('a');
      link.href = resume.downloadUrl;
      link.download = resume.filename || 'TiffanyHall_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      {/* Icon Header */}
      <div className={`h-20 bg-gradient-to-r ${colors.bg} flex items-center justify-center`}>
        <resume.icon className={colors.text} size={32} />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-3">
          {resume.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {resume.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleView}
            className={`bg-gradient-to-r ${colors.button} text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group`}
            aria-label={`View ${resume.title} resume (opens in new tab)`}
          >
            <Eye size={16} className="mr-2" />
            View Resume
          </button>
          <button
            onClick={handleDownload}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center"
            aria-label={`Download ${resume.title} PDF`}
          >
            <Download size={16} className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

ResumeCard.propTypes = {
  resume: PropTypes.shape({
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    viewUrl: PropTypes.string,
    downloadUrl: PropTypes.string,
    filename: PropTypes.string,
  }).isRequired,
};

export default React.memo(ResumeCard);