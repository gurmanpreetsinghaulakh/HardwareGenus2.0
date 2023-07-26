'use client'
import React from 'react';
import { getArticleCategory } from './Filters/categoryFilter';
import { getTimeAgo } from './Features/getTimeAgo';
import { shareContent } from './Features/handleShare';
import Link from 'next/link';
import fetchNewsData from '../src/app/api/api';

const BigBanner = ({ newsData, slugOfNavbar }) => {

  // Extracting the article details from the newsData prop
  const selectedCategoryFromTopNavbar = slugOfNavbar || '';
  const articles = selectedCategoryFromTopNavbar
    ? newsData.articles.filter((article) => {
        const category = getArticleCategory(article.title, article.description);
        return category === selectedCategoryFromTopNavbar;
      }).slice(0, 2)
    : newsData.articles.slice(0, 2);

  const handleShare = (title, url) => {
    shareContent(title, url = title);
  };

  return (
    <main>
      <div className="banner-container">
        {articles.map((article, index) => {
          const category = getArticleCategory(article.title, article.description);
          const timeAgo = getTimeAgo(article.publishedAt);

          return (
            <div className="banner" key={index}>
              <Link href={`/${article.title}`}>
                <div className="banner-thumbnail">
                  <img src={article.urlToImage} alt="" />
                </div>
                <div className="banner-title">
                  <h2>{article.title}</h2>
                </div>
              </Link>
              <div className="banner-info">
                <div className="category">{category}</div>
                <div
                  className="share-btn"
                  onClick={() => handleShare(article.title, article.url)}
                >
                  <img src="/Share.png" alt="Share" width="20px" />
                </div>
                <div className="published-time">{timeAgo}</div>
              </div>
            </div>
          );
        })}
      </div>
      
    </main>
  );
};

export default BigBanner;
