
import fetchNewsData from "../../src/app/api/api";
import Link from "next/link";
import React, { useState } from "react";


const SearchNavbar = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async (value) => {
    const newsData = await fetchNewsData();
    console.log(newsData);

    const filteredResults = newsData.articles.filter((article) => {
      return (
        value &&
        article &&
        article.title &&
        article.title.toLowerCase().includes(value.toLowerCase())
      );
    });
    console.log(filteredResults);
    setResults(filteredResults);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="search-container">
      <input
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        id="search-input"
        placeholder="Search..."
        value={input}
      />
      <ul id="search-results">
        {results.map((article, index) => (
          <li key={index}>
            <Link href={`/${article.title}`} target="_blank" rel="noopener noreferrer">
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchNavbar;
