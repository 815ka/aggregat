-- Drop existing tables if needed
DROP TABLE IF EXISTS ai_content;
DROP TABLE IF EXISTS articles;

-- Articles table
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    link TEXT NOT NULL,
    source_name TEXT NOT NULL,
    category TEXT NOT NULL,
    published_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

-- AI Content table
CREATE TABLE ai_content (
    id SERIAL PRIMARY KEY,
    article_id INT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    bullet_points TEXT, -- semicolon-separated list
    category TEXT,
    keywords TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for faster lookups
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_ai_content_article_id ON ai_content(article_id);
