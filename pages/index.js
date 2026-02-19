import React, { useEffect, useState } from 'react';
import '../styles/global.css';

export default function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">World News Aggregator</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/categories">Categories</a>
          <a href="/about">About</a>
          <a href="/policy">Policy</a>
          <a href="/privacy">Privacy</a>
          <a href="/attribution">Attribution</a>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>

      <section className="hero">
        <h1>Breaking News</h1>
        <p>Global Event Today — AI Summary: Short neutral summary of the event.</p>
        <a href="/article/1" className="btn-primary">Read Full Story</a>
      </section>

      <main>
        <h2>Latest Articles</h2>
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <a href={`/article/${article.id}`}>Read More</a>
          </div>
        ))}
      </main>

      <aside>
        <h3>Trending Topics</h3>
        <ul>
          <li>#UkraineConflict</li>
          <li>#AIRegulation</li>
          <li>#ClimateChange</li>
        </ul>
      </aside>

      <footer className="footer">
        <p>
          <a href="/about">About</a> | 
          <a href="/policy">Editorial Policy</a> | 
          <a href="/privacy">Privacy</a> | 
          <a href="/attribution">Attribution</a>
        </p>
        <p>© 2026 World News Aggregator</p>
      </footer>
    </div>
  );
}
