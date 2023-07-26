"use client"
import React from 'react';
import { getArticleCategory } from './Filters/categoryFilter';
import { getTimeAgo } from './Features/getTimeAgo'; // Assuming you have a separate file getTimeAgo.js that exports the getTimeAgo function
import { shareContent } from './Features/handleShare';
import Link from 'next/link';
import Image from 'next/image';
const MedNewsBox = ({ newsData, slugOfNavbar }) => {
  // Extracting the article details from the newsData prop
  const selectedCategoryFromTopNavbar = slugOfNavbar || '';
  const articles = selectedCategoryFromTopNavbar
    ? newsData.articles.filter((article) => {
        const category = getArticleCategory(article.title, article.description);
        return category === selectedCategoryFromTopNavbar;
      }).slice(18, 28)
    : newsData.articles.slice(19, 29);

    const handleShare = (title, url) => {
      shareContent(title, url = title);
    };

  return (
    <>
      <div className="small-container">
        {articles.map((article, index) => {
          const category = getArticleCategory(article.title, article.description);
          const timeAgo = getTimeAgo(article.publishedAt);
          return (
            <div className="banner" key={index}>
               <Link href={`/${article.title}`} aria-label={`Read More About ${article.title}`}>
                <div className="banner-thumbnail">
                  <Image src={article.urlToImage} alt="" width={300} height={200} />
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
                    <Image src="/Share.png" alt="Share" width={20} height={20} />
                  </div>
                  <div className="published-time">{timeAgo}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MedNewsBox;
