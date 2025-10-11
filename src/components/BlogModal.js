import React, { useEffect, useRef } from "react";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

const BlogModal = ({ post, isOpen, onClose, content, loadingContent }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Trigger syntax highlighting when content changes
  useEffect(() => {
    if (content && isOpen) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        console.log('Running Prism.highlightAll()');
        Prism.highlightAll();
      }, 100);
    }
  }, [content, isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const processMarkdown = (markdownText) => {
    // Configure marked for better parsing with syntax highlighting
    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false,
      highlight: function(code, lang) {
        if (lang && Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang);
        }
        return code;
      }
    });

    // Convert markdown to HTML
    let html = marked.parse(markdownText);

    // First, wrap all standalone images with download links
    html = html.replace(/<p>(<img[^>]*>)<\/p>/g, (_, img) => {
      const srcMatch = img.match(/src="([^"]*)"/);
      const altMatch = img.match(/alt="([^"]*)"/);

      if (!srcMatch) return `<p>${img}</p>`;

      const src = srcMatch[1];
      const altText = altMatch ? altMatch[1] : 'Image';
      const filename = src.split('/').pop() || 'image.jpg';

      return `<p><a href="${src}" download="${filename}" class="image-download-link" title="Click to download ${altText}">${img}</a></p>`;
    });

    // Post-process the HTML to add our custom styling to links
    html = html.replace(/<a href="([^"]*)"([^>]*)>/g, (match, href, rest) => {
      // Skip if already has class attribute (like our image-download-link)
      if (rest.includes('class=')) {
        return match;
      }

      const isExternal = !href.includes('tiffanycodes.com');
      const target = isExternal ? ' target="_blank"' : '';
      const rel = isExternal ? ' rel="noopener noreferrer"' : ' rel="noopener"';

      return `<a href="${href}"${target}${rel} class="text-purple-600 hover:text-purple-800 underline"${rest}>`;
    });

    // Apply URL linking only to bare URLs (not already in links)
    return linkifyUrls(html);
  };

  const linkifyUrls = (html) => {
    // Split by <a> tags to avoid processing URLs inside existing links
    const parts = html.split(/(<a[^>]*>.*?<\/a>)/g);

    return parts.map((part, index) => {
      // If this part is an <a> tag, leave it unchanged
      if (part.match(/^<a[^>]*>.*<\/a>$/)) {
        return part;
      }

      // Otherwise, process bare URLs in this part
      const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`[\]]*)/g;
      return part.replace(urlRegex, (url) => {
        // Check if it's an external link (not tiffanycodes.com)
        const isExternal = !url.includes('tiffanycodes.com');

        // Handle different file types
        let finalUrl = url;
        let linkText = url;

        if (url.endsWith('.gs')) {
          linkText = `Click here to download the Apps Script code you need to copy`;
        } else if (url.endsWith('.txt')) {
          linkText = `Click here to view the Apps Script code you need to copy`;
        } else if (url.endsWith('.js') || url.endsWith('.py')) {
          linkText = `Click here to download the ${url.split('/').pop()} file`;
        }

        const targetAttr = isExternal ? 'target="_blank"' : '';
        const relAttr = isExternal ? 'rel="noopener noreferrer"' : 'rel="noopener"';

        return `<a href="${finalUrl}" ${targetAttr} ${relAttr} class="text-purple-600 hover:text-purple-800 underline">${linkText}</a>`;
      });
    }).join('');
  };

  if (!isOpen || !post) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-900 bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl max-h-[90vh] w-full overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="overflow-y-auto max-h-[90vh]">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
            <div className="absolute bottom-6 left-6 right-16 text-white">
              <div className="flex items-center gap-4 text-sm mb-3 opacity-90">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <p className="blog-excerpt">
              {post.excerpt}
            </p>

            {loadingContent ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <span className="ml-4 text-gray-600 text-lg">Loading content...</span>
              </div>
            ) : content ? (
              <div 
                className="prose prose-lg prose-purple max-w-none markdown-content"
                dangerouslySetInnerHTML={{ 
                  __html: processMarkdown(content)
                }}
              />
            ) : (
              <div className="text-center py-12 text-gray-500">
                Content failed to load. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;