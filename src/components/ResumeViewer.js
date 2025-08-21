import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { 
  ArrowLeft, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// Use local worker file to avoid CDN/CORS issues
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

/**
 * ResumeViewer component for displaying PDF resumes with custom branding
 * Follows React best practices: hooks, memoization, error boundaries
 */
const ResumeViewer = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(() => {
    // Set initial scale based on screen size
    return window.innerWidth < 768 ? 0.8 : 1.2;
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Memoized resume configuration
  const resumeConfig = useMemo(() => {
    const configs = {
      'product-owner': {
        title: 'Technical Product Owner',
        subtitle: 'Leading cross-functional teams to deliver educational platforms',
        pdfPath: '/pdfs/TiffanyHall_ProductOwner_2025.pdf',
        filename: 'TiffanyHall_ProductOwner_2025.pdf',
        color: 'purple'
      },
      'developer': {
        title: 'Full-Stack Developer',
        subtitle: 'Building scalable EdTech solutions with modern frameworks',
        pdfPath: '/pdfs/TiffanyHall_Developer_2025.pdf',
        filename: 'TiffanyHall_Developer_2025.pdf',
        color: 'teal'
      },
      'consultant': {
        title: 'EdTech Consultant',
        subtitle: '15+ years education domain expertise meets technical solutions',
        pdfPath: '/pdfs/TiffanyHall_Consultant_2025.pdf',
        filename: 'TiffanyHall_Consultant_2025.pdf',
        color: 'pink'
      }
    };
    return configs[type] || configs['product-owner'];
  }, [type]);

  // Event handlers with useCallback for performance
  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    setError('Failed to load PDF. Please try again.');
    setIsLoading(false);
    console.error('PDF load error:', error);
  }, []);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = resumeConfig.pdfPath;
    link.download = resumeConfig.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [resumeConfig]);

  const handleBack = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.2, 0.6));
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber(prev => Math.min(prev + 1, numPages || 1));
  }, [numPages]);

  // Color scheme based on resume type - coordinate with button gradients
  const getColorClasses = useCallback((color) => {
    const colorMap = {
      purple: 'from-purple-900 to-purple-600',
      teal: 'from-teal-900 to-teal-600', 
      pink: 'from-pink-900 to-pink-600'
    };
    return colorMap[color] || colorMap.purple;
  }, []);

  const gradientClass = getColorClasses(resumeConfig.color);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${gradientClass} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button & Title */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                aria-label="Back to main site"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              <div>
                <h1 className="text-xl font-bold">{resumeConfig.title}</h1>
                <p className="text-sm text-white/80 hidden sm:block">
                  {resumeConfig.subtitle}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={zoomOut}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Zoom out"
                disabled={scale <= 0.6}
              >
                <ZoomOut size={20} />
              </button>
              <button
                onClick={zoomIn}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Zoom in"
                disabled={scale >= 3.0}
              >
                <ZoomIn size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
                aria-label={`Download ${resumeConfig.title} PDF`}
              >
                <Download size={16} />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        {isLoading && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Loading resume...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mx-4 max-w-md">
            <p className="text-red-800">{error}</p>
            <button
              onClick={handleBack}
              className="mt-4 text-red-600 hover:text-red-800 underline"
            >
              Return to main site
            </button>
          </div>
        )}

        {!error && (
          <div className="bg-white rounded-lg shadow-xl overflow-x-auto" 
               style={{
                 width: windowWidth >= 1000 ? 'auto' : '100%',
                 maxWidth: windowWidth >= 1000 ? '1000px' : 'none',
                 margin: windowWidth >= 1000 ? '0 auto' : '0'
               }}>
            <div className="flex justify-center">
              <Document
                file={resumeConfig.pdfPath}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading=""
              >
                <Page
                  pageNumber={pageNumber}
                  scale={windowWidth >= 1000 ? scale : undefined}
                  width={windowWidth < 1000 ? windowWidth - 32 : undefined}
                  className="block"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </Document>
            </div>
          </div>
        )}

        {/* Page Navigation */}
        {numPages && numPages > 1 && (
          <div className="flex items-center justify-center mt-6 space-x-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            
            <span className="px-4 py-2 bg-gray-100 rounded-lg font-medium">
              Page {pageNumber} of {numPages}
            </span>
            
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-2">
            Ready to discuss this opportunity?
          </p>
          <a
            href="mailto:tiffanycodes.co@gmail.com?subject=Let's be awesome together, Tiffany!"
            className={`bg-gradient-to-r ${gradientClass} text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow inline-block text-decoration-none`}
          >
            Let's Connect
          </a>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(ResumeViewer);