import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../styles/global.css';
import Head from 'next/head';

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [article, setArticle] = useState(null);
  const [aiContent, setAiContent] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/articles/${id}`).then(res => res.json()).then(setArticle);
      fetch(`/api/ai/${id}`).then(res => res.json()).then(setAiContent);
    }
  }, [id]);

  if (!article) return <p>Loading...</p>;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "datePublished": article.published_at,
    "author": { "@type": "Organization", "name": "World News Aggregator" },
    "publisher": { "@type": "Organization", "name": "World News Aggregator" },
    "description": aiContent?.summary || article.excerpt,
    "articleSection": aiContent?.category || "General",
    "keywords": aiContent?.keywords || "",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yourdomain.com/article/${article.id}`
    }
  };

  return (
    <div className="article-detail">
      <Head>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Head>
      <h1>{article.title}</h1>
      <p>Published: {new Date(article.published_at).toLocaleDateString()}</p>
      {aiContent && (
        <section className="ai-summary">
          <h2>AI Summary</h2>
          <p>{aiContent.summary}</p>
          <h3>Key Points</h3>
          <ul>
            {aiContent.bullet_points.split('; ').map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </section>
      )}
      <a href={article.link} target="_blank" rel="noopener noreferrer">Read Full Story</a>
    </div>
  );
}
