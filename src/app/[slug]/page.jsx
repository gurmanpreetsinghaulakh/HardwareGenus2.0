
import React from 'react'
import fetchNewsData from '../api/api'
import RealtedNews from '../../../Components/RealtedNews'
import TrendingDown from '../../../Components/TrendingDown'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'



export async function generateMetadata({ params: { slug } }) {

  const slugMeta = await getData();
  const decodedTitle = decodeURIComponent(slug)
  const decodedSlug = decodeURIComponent(slug).toLocaleLowerCase();
  // console.log(decodedSlug)

  const filteredArticles = slugMeta.articles.find((article) =>
    article.title.toLocaleLowerCase() === decodedSlug)

  return {
    title: decodedTitle,
    description: filteredArticles?.paraphrased_content?.slice(0, 400),
    keywords: filteredArticles?.meta_tags,
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
  }
}

async function getData() {
  const res = await fetchNewsData()
  if (!res) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res
}

export default async function Page({ params: { slug } }) {
  const data = await getData()

  const decodedSlug = decodeURIComponent(slug).toLocaleLowerCase();
  // console.log(decodedSlug)

  const filteredArticles = data.articles.find((article) =>
    article.title.toLocaleLowerCase() === decodedSlug
  );



  // console.log(filteredArticles)


  const article = filteredArticles

  return (


    <>
      <Head>
        <meta property="og:description" content={article?.description} />
      </Head>

      {article ? (
        <div className="news-page">
          <div className="news-page-content">
            <div className="news-header">
              <h1>{article.title}</h1>
              <div className="info-under-title">
                <p className="author">By {article.author}</p>
                <p className="published-date">
                  Published on {new Date(article.publishedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="trending_down">
              <div className="news-content">
                <Image
                  src={article.urlToImage}
                  alt="Article"
                  className="article-image"
                  layout="responsive"
                  width={100}
                  height={550}
                  objectFit="cover"
                />
                <p>"{article.description.slice(0, 112)} --- <Link style={{ color: 'coral' }} href={article.url}>{article.source.name}</Link> </p>
                {article.paraphrased_content && typeof article.paraphrased_content === "string" ? (
                  <p>{article.paraphrased_content.slice(0, 1600)} -- <Link style={{ color: 'coral' }} href={article.url}>Continue Reading.</Link></p>
                ) : (
                  <p>Content not available.</p>
                )}
                <div className="mt-after-trending-down">
                  <div className="news-footer">
                    <p className="source">Source: {article.author}, {article.source.name} etc.</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
              <TrendingDown newsData={data} />
            </div>
          </div>
        </div>

      ) : (
        <p style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 200, fontSize: 20 }}>No articles found.</p>
      )}
      <RealtedNews newsData={data} />
    </>
  );
}







