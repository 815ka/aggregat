import pool from '../../../config/db';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    const result = await pool.query(
      'SELECT summary, bullet_points, category, keywords FROM ai_content WHERE article_id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'AI summary not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch AI summary' });
  }
}
