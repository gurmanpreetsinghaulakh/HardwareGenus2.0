import fetchNewsData from '../app/api/api';

export default async function sitemap() {
  const baseUrl = "https://hardware-genus2-0.vercel.app";

  // Get all articles
  const posts = await fetchNewsData();
    
  const postsUrls = posts?.articles.map((post) => {
    const encodedTitle = encodeURIComponent(post.title);
    return {
      url: `${baseUrl}/${encodedTitle}`,
    };
  }) ?? [];
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postsUrls,
  ];
}
