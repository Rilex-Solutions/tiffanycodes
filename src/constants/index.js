/**
 * Application constants
 */

// Navigation items in order
export const NAV_ITEMS = ["services", "resume", "portfolio", "about", "contact"];

// Scroll threshold for navbar background change
export const SCROLL_THRESHOLD = 50;

// Animation durations (in ms)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
};

// Color palette for service cards
export const SERVICE_COLORS = {
  PURPLE: "purple",
  TEAL: "teal", 
  PINK: "pink",
};

// External links
export const EXTERNAL_LINKS = {
  WCAG_GUIDELINES: "https://www.w3.org/WAI/WCAG21/quickref/",
  GITHUB_REPO: "https://github.com",
};

// Accessibility constants
export const A11Y = {
  FOCUS_OUTLINE_COLOR: "#7c3aed",
  FOCUS_OUTLINE_WIDTH: "2px",
  MIN_CONTRAST_RATIO: 4.5,
  NEW_TAB_INDICATOR: "(opens in new tab)",
};