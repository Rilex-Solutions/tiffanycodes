const BLOG_API_URL = 'https://tiffanycodes-blog-api.pages.dev';

export const fetchBlogPosts = async () => {
  try {
    const response = await fetch(`${BLOG_API_URL}/metadata/index.json`);
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
};

export const fetchBlogPost = async (slug) => {
  try {
    const response = await fetch(`${BLOG_API_URL}/posts/${slug}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch blog post ${slug}:`, error);
    return null;
  }
};