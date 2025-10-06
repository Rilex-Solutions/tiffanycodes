# TiffanyCodes Portfolio Website

A modern, responsive portfolio website built with React showcasing Technical Product Owner, Full-Stack Developer, and EdTech Consultant expertise.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development
```bash
# Clone the repository
git clone https://github.com/Rilex-Solutions/tiffanycodes.git
cd tiffanycodes

# Install dependencies
npm install

# Start development server (runs on ports 3000/3001)
npm start
```

**Important**: If you encounter port conflicts, kill existing processes:
```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

## 🌐 Hosting & Deployment

### Current Setup
- **Domain**: tiffanycodes.com
- **Hosting**: GitHub Pages
- **Repository**: https://github.com/Rilex-Solutions/tiffanycodes.git
- **Branch**: main

### Deploy to Production
```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This runs:
1. `npm run build` (creates optimized production build)
2. `gh-pages -d build` (deploys to gh-pages branch)

### Domain Configuration
- CNAME file in `/public/CNAME` contains: `tiffanycodes.com`
- GitHub Pages automatically serves from the `gh-pages` branch
- Custom domain is configured in GitHub repository settings

## 📁 Project Structure

```
tiffanycodes/
├── public/
│   ├── CNAME                    # Domain configuration
│   ├── images/                  # Profile and project images
│   ├── pdfs/                   # Resume PDFs (3 versions)
│   └── pdf.worker.min.js       # Local PDF.js worker (CORS fix)
├── src/
│   ├── components/
│   │   ├── Portfolio.js        # Main portfolio component
│   │   ├── ResumeViewer.js     # PDF resume viewer
│   │   ├── Navigation.js       # Site navigation
│   │   ├── ProjectCard.js      # Project showcase cards
│   │   ├── ServiceCard.js      # Services display cards
│   │   ├── ResumeCard.js       # Resume download cards
│   │   ├── RotatingTitles.js   # Hero section animated titles
│   │   ├── Blog.js             # Blog listing component
│   │   ├── BlogCard.js         # Individual blog post cards
│   │   └── BlogModal.js        # Blog post modal viewer
│   ├── data/
│   │   ├── personal.js         # Personal info & contact
│   │   ├── services.js         # 3-column services data
│   │   ├── projects.js         # Portfolio projects
│   │   ├── resumes.js          # Resume configurations
│   │   └── blogPosts.js        # Blog API integration
│   └── App.css                 # Global styles (Tailwind + custom)
└── package.json
```

## 🎨 Key Features

### Three Focus Areas
The site is organized around three career focus areas:
1. **Technical Product Owner** (Purple theme)
2. **Full-Stack Developer** (Teal theme)  
3. **EdTech Consultant** (Pink theme)

### Resume System
- Three tailored PDF versions in `/public/pdfs/`
- Custom resume viewer at `/resume/{type}` routes
- Download functionality for each version
- Mobile-optimized PDF display

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Custom breakpoints and responsive PDF viewer
- Optimized button layouts and navigation

## 🔧 Technical Quirks & Configuration

### PDF Viewer (react-pdf)
```javascript
// IMPORTANT: Uses local worker to avoid CDN/CORS issues
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
```
- Worker file located in `/public/pdf.worker.min.js`
- Mobile responsive with conditional width/scale handling
- Window width tracking for optimal display

### Resume Viewer Mobile Fix
- Screens ≥1000px: Normal scale-based rendering
- Screens <1000px: Width-constrained rendering (`windowWidth - 32`)
- Eliminates mobile overflow while maintaining quality

### Button Styling Mobile Fix
```css
.btn-primary, .btn-secondary {
  /* Mobile: centered, fit-content width */
  @apply w-fit mx-auto sm:mx-0;
}
```

### Services Data Structure
Located in `/src/data/services.js` - matches resume focus areas:
- Technical Product Owner → Purple
- Full-Stack Developer → Teal  
- EdTech Consultant → Pink

## 🛠 Development Commands

```bash
# Development
npm start                # Start dev server
npm test                # Run tests  
npm run build           # Create production build

# Deployment  
npm run deploy          # Build and deploy to GitHub Pages

# Linting (if configured)
npm run lint            # Code linting
npm run lint:fix        # Auto-fix linting issues
```

## 🎯 Content Management

### Updating Personal Information
Edit `/src/data/personal.js`:
```javascript
export const personalInfo = {
  email: "tiffanycodes.co@gmail.com",
  location: "Remote",
  github: "https://github.com/tHALL3000",
  linkedin: "https://linkedin.com/in/tiffany-hall-colorado"
};
```

### Adding New Projects
Edit `/src/data/projects.js` - each project needs:
- title, description, technologies
- image (in `/public/images/`)
- links (demo, github)
- color theme

### Updating Services/Skills
Edit `/src/data/services.js` - maintain the three-column structure matching resume focus areas.

### Resume Updates
1. Replace PDFs in `/public/pdfs/`
2. Update metadata in `/src/data/resumes.js`
3. Ensure filenames match between both locations

## 🚨 Common Issues

### Port Conflicts
Development server may conflict with other React apps. Always kill processes on 3000/3001 before starting.

### PDF Worker CORS
The local `pdf.worker.min.js` file prevents CDN/CORS issues. Don't remove or relocate it.

### Mobile PDF Overflow
The responsive PDF viewer uses conditional rendering. Test on actual mobile devices, not just browser dev tools.

### GitHub Pages Deployment
- Ensure `homepage` in `package.json` matches your domain
- CNAME file must contain your custom domain
- Deploy creates a separate `gh-pages` branch

## 📝 Blog System

### Architecture Overview
The blog system uses a **hybrid approach** combining dynamic API content with static styling:

### 1. **Content Source**
- **Blog API**: `https://tiffanycodes-blog-api.pages.dev`
- **Metadata Endpoint**: `/metadata/index.json` (post listings)
- **Content Endpoint**: `/posts/{slug}.json` (individual posts)

### 2. **Data Flow**
```javascript
// Blog posts are fetched dynamically via API
export const fetchBlogPosts = async () => {
  const response = await fetch(`${BLOG_API_URL}/metadata/index.json`);
  return response.json().posts || [];
};
```

### 3. **Styling Pipeline**
The blog content gets processed through multiple layers:

#### **JSON Structure → React Components**
- `BlogCard.js`: Displays blog post cards with metadata
- `BlogModal.js`: Full blog post viewer with content processing

#### **Markdown Processing**
- **Marked.js**: Converts markdown content to HTML
- **Prism.js**: Provides syntax highlighting for code blocks
- **Custom URL Processing**: Auto-linkifies URLs with special file handling

#### **CSS Styling Approach**
```javascript
// Applied to rendered markdown content:
<div className="prose prose-lg prose-purple max-w-none markdown-content">
```

**Multi-layered styling:**
1. **Tailwind Prose**: Base typography (`prose prose-lg prose-purple`)
2. **Custom CSS**: `.markdown-content` class rules (src/index.css:32-108)

#### **Custom Markdown Styles**
- **Headers**: Purple color (#581c87) with hot pink underlines (#ec4899)
- **Code blocks**: Dark theme with JetBrains Mono font + Prism.js highlighting
- **Links**: Purple with hover effects and text shadows
- **Excerpts**: Turquoise color (#14b8a6) in italics
- **Typography**: Poppins font family for headings, Inter for body

### 4. **Style Application Method**
```javascript
// BlogModal.js processing pipeline:
const processMarkdown = (markdownText) => {
  marked.setOptions({
    highlight: function(code, lang) {
      if (lang && Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      }
      return code;
    }
  });

  let html = marked(markdownText);
  return linkifyUrls(html); // Custom URL processing
};
```

### 5. **Supported Code Languages**
- JavaScript/JSX
- Python
- CSS
- JSON
- Bash
- More via Prism.js components

## 📞 Contact & Support

- **Email**: tiffanycodes.co@gmail.com
- **GitHub**: https://github.com/tHALL3000
- **Live Site**: https://tiffanycodes.com

---

**Last Updated**: September 2025
**Node Version**: v16+
**React Version**: 19.1.0
