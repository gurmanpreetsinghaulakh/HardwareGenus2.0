"use client"
import React from 'react';
import { getArticleCategory } from './Filters/categoryFilter';
import ActiveUsers from './Features/activeUsers';
import Link from 'next/link'
import { useEffect, useState } from 'react';


const Trending = ({ newsData }) => {
  const articles = newsData.articles.slice(14, 21);

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
  const imageSrc = isLightMode ? '/Profile2.png' : '/Profile.png';

  return (
    <>
      <div className="trending-section">
        <div className="trending-news-down">
          <div className="title">
            <h2
              style={{
                color: 'var(--primary-active)',
                alignSelf: 'start',
                marginTop: '4%',
                marginBottom: '10%',
                marginRight: 40,
              }}
            >
              Trending Stories
            </h2>
          </div>
          <div className="line" style={{ marginRight: 30 }}></div>
          {articles.map((article, index) => {
            const category = getArticleCategory(article.title, article.description);

            return (
              <div className="news data" key={index}>
                <Link href={`/${article.title}`}>
                  <div className="title">{article.title.slice(0, 55)}...</div>
                </Link>
                <div className="info-trending">
                  <div className="users-watching-it">
                    <img id="profile-buttons" src={imageSrc} alt="" width="20px" />
                  </div>
                  <ActiveUsers /> {/* Include the ActiveUsers component to show the active readers */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Trending;
