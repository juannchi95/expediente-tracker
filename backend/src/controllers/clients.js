import pool from '../db/connection.js';

export const getClientByCI = async (req, res) => {
  const { ci } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, full_name FROM clients WHERE doc_num = $1 LIMIT 1',
      [ci]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al buscar cliente:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};