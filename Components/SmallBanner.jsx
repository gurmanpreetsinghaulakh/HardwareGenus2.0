import React from 'react';
import { getArticleCategory } from './Filters/categoryFilter';
import Link from 'next/link';
import Image from 'next/image';
const SmallBanner = ({ newsData, slugOfNavbar }) => {
  // Extracting the article details from the newsData prop
  const selectedCategoryFromTopNavbar = slugOfNavbar || '';
  const articles = selectedCategoryFromTopNavbar
    ? newsData.articles.filter((article) => {
        const category = getArticleCategory(article.title, article.description);
        return category === selectedCategoryFromTopNavbar;
      }).slice(0)
    : newsData.articles.slice(29);

  return (
    <>
      <div className="sub-title" style={{marginTop: 70}}>
        <Image className="deallogo" src="/deal.png" alt="" width={45} height={45} />
        <h2> Uncovered News</h2>
      </div>
      <div className="small-boxes-head">
        {articles.map((article, index) => {
          const category = getArticleCategory(article.title, article.description);

          return (
            <div className="small-news-boxes data" key={index}>
             <Link href={`/${article.title}`} aria-label={`Read More About ${article.title}`}>
                <div className="small-thumb">
                <Image src={article.urlToImage} alt="article banner" width={300} height={200} />
                </div>
              </Link>
              <div className="info-news">
              <Link href={`/${article.title}`} aria-label={`Read More About ${article.title}`}>
                  <div className="title">
                    <h2>{article.title}</h2>
                  </div>
                  </Link>
                <div className="info-main">
                  <div className="category">{category}</div>
                  <div className="share-btn">
                    <Image src="/Share.png" alt="" width={20} height={20} />
                  </div>
                  <div className="published-time">
                    {new Date(article.publishedAt).toLocaleString()}
                  </div>
                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SmallBanner;
