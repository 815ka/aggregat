import pool from '../../config/db';

export default async function handler(req, res) {
  try {
    const result = await pool.query(
      'SELECT id, title, excerpt, category, published_at FROM articles ORDER BY published_at DESC LIMIT 20'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}
