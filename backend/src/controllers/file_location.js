import pool from '../db/connection.js';

export const getAllLocations = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, ubicacion FROM ubicaciones_expedientes ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener ubicaciones:', error);
    res.status(500).json({ error: 'Error del servidor al obtener ubicaciones' });
  }
};
