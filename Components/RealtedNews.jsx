"use client"
import React from 'react';
import { getArticleCategory } from './Filters/categoryFilter';
import { getTimeAgo } from './Features/getTimeAgo'; // Assuming you have a separate file getTimeAgo.js that exports the getTimeAgo function
import { shareContent } from './Features/handleShare';
import Link from 'next/link';

const RealtedNews = ({ newsData, slugOfNavbar }) => {
  // Extracting the article details from the newsData prop
  const selectedCategoryFromTopNavbar = slugOfNavbar || '';
  const articles = selectedCategoryFromTopNavbar
    ? newsData.articles.filter((article) => {
        const category = getArticleCategory(article.title, article.description);
        return category === selectedCategoryFromTopNavbar;
      }).slice(0, 20)
    : newsData.articles.slice(0, 10);

    const handleShare = (title, url) => {
      shareContent(title, url = title);
    };

  return (
    <>
    <div className='realted-news-in-news'>
        <div className="top-trending-news-in-news">
            <h3>Popular Articles
            <div className="underline-under-text"></div>
            </h3>
            
        </div>
      <div className="small-container">
        {articles.map((article, index) => {
          const category = getArticleCategory(article.title, article.description);
          const timeAgo = getTimeAgo(article.publishedAt);
          return (
            <div className="banner" key={index}>
                <Link href={`/${article.title}`} aria-label={`Read More About ${article.title}`}>
                <div className="banner-thumbnail">
                  <img src={article.urlToImage} alt="" />
                </div>
              </Link>
              <div className="right">
              <Link href={`/${article.title}`} aria-label={`Read More About ${article.title}`}>
                  <div className="underline2" />
                  <div className="banner-title">
                    <h2>{article.title}</h2>
                  </div>
                  </Link>
                <div className="banner-info">
                  <div className="category">{category}</div>
                  <div className="share-btn" onClick={() => handleShare(article.title, article.url)}>
                    <img src="/Share.png" alt="Share" width="20px" />
                  </div>
                  <div className="published-time">{timeAgo}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default RealtedNews;
