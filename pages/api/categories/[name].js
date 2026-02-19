import pool from '../../../config/db';

export default async function handler(req, res) {
  const { name } = req.query;
  try {
    const result = await pool.query(
      'SELECT id, title, excerpt, published_at FROM articles WHERE category = $1 ORDER BY published_at DESC LIMIT 20',
      [name]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch category articles' });
  }
}
