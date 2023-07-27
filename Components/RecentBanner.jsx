"use client"
import React from 'react';
import { getArticleCategory } from './Filters/categoryFilter';
import { getTimeAgo } from './Features/getTimeAgo'; // Assuming you have a separate file getTimeAgo.js that exports the getTimeAgo function
import { shareContent } from './Features/handleShare';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const RecentBanner = ({ newsData, slugOfNavbar }) => {
  const [isLightMode, setIsLightMode] = useState(false);

  const checkLightMode = () => {
    setIsLightMode(document.body.classList.contains('light-mode'));
  };

  useEffect(() => {
    checkLightMode();

    // Use MutationObserver to listen for changes in the class of document.body
    const observer = new MutationObserver(checkLightMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Set the image source based on the isLightMode state
  const imageSrc = isLightMode ? '/Recent2.png' : '/Recent.png';


  // Extracting the article details from the newsData prop
  const selectedCategoryFromTopNavbar = slugOfNavbar || '';
  const articles = selectedCategoryFromTopNavbar
    ? newsData.articles.filter((article) => {
      const category = getArticleCategory(article.title, article.description);
      return category === selectedCategoryFromTopNavbar;
    }).slice(12, 13)
    : newsData.articles.slice(12, 13);

    const handleShare = (title, url) => {
      shareContent(title, url = title);
    };

  return (
    <div className="recent-container">
      <div className="recent-news">
        <div className="img">
          <Image className="recentLogo" src={imageSrc} alt="" width={30} height={30} />
        </div>
        <div className="title">
          <h2>Recent News</h2>
        </div>
      </div>
      <div className="recent">
        {articles.map((article, index) => {
          const category = getArticleCategory(article.title, article.description);
          const timeAgo = getTimeAgo(article.publishedAt); // Using the getTimeAgo function

          return (
            <div className="banner" key={index}>
              <Link href={`/${article.title}`} aria-label={`Read More About ${article.title}`}>
                <div className="banner-thumbnail">
                <img src={article.urlToImage} alt="article banner"/>
                </div>
              </Link>
              <div className="centering-recent-banner-info">
              <Link href={`/${article.title}`} aria-label={`Read More About ${article.title}`}>
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
    </div>
  );
};

export default RecentBanner;
