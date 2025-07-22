import pool from '../db/connection.js';

export const getAllColors = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, color, description FROM colors ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los colores:', error);
    res.status(500).json({ error: 'Error del servidor al obtener colores del expediente' });
  }
};