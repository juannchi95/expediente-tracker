import pool from '../db/connection.js';

export const getStatusByLocation = async (req, res) => {
  const { id_ubicacion } = req.query;

  if (!id_ubicacion) {
    return res.status(400).json({ error: 'Parámetro id_ubicacion es requerido' });
  }

  try {
    const result = await pool.query(
      'SELECT id, estado FROM estado_expedientes WHERE id_ubicacion = $1 ORDER BY id ASC',
      [id_ubicacion]
    );
    return res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener estados:', error);
    return res.status(500).json({ error: 'Error del servidor al obtener estados' });
  }
};