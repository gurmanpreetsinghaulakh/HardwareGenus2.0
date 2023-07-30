import fetchNewsData from '../app/api/api';

export default async function sitemap() {
  const baseUrl = "https://www.hardwaregenus.online";

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
