import pool from '../config/db';

export async function getServerSideProps({ res }) {
  const categoriesResult = await pool.query('SELECT DISTINCT category FROM ai_content');
  const categories = categoriesResult.rows.map(row => row.category);

  const articlesResult = await pool.query('SELECT id FROM articles');
  const articles = articlesResult.rows.map(row => row.id);

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `<url><loc>https://yourdomain.com/</loc></url>\n`;

  categories.forEach(cat => {
    xml += `<url><loc>https://yourdomain.com/category/${cat}</loc></url>\n`;
  });

  articles.forEach(id => {
    xml += `<url><loc>https://yourdomain.com/article/${id}</loc></url>\n`;
  });

  xml += '</urlset>';

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() { return null; }
