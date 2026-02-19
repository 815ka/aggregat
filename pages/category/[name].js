import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../styles/global.css';

export default function CategoryPage() {
  const router = useRouter();
  const { name } = router.query;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (name) {
      fetch(`/api/categories/${name}`).then(res => res.json()).then(setArticles);
    }
  }, [name]);

  if (!articles.length) return <p>Loading...</p>;

  return (
    <div className="category-page">
      <h1>{name} News</h1>
      {articles.map(article => (
        <div key={article.id} className="article-card">
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <a href={`/article/${article.id}`}>Read More</a>
        </div>
      ))}
    </div>
  );
}
