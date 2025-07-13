import pool from '../db/connection.js';

export const createMovement = async (req, res) => {
  const { cliente_id, id_ubicacion, id_estado, nro_expediente, comentario } = req.body;

  if (!id_ubicacion || !cliente_id || !id_estado || !nro_expediente) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const query = `
      INSERT INTO movements (id_ubicacion, cliente_id, id_estado, nro_expediente, comentario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [id_ubicacion, cliente_id, id_estado, nro_expediente, comentario];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al guardar movimiento:', error);
    res.status(500).json({ error: 'Error del servidor al guardar movimiento' });
  }
};

export const getMovements = async (req, res) => {
  const { ci, expediente, limit = 50, offset = 0 } = req.query;

  if (!ci) {
    return res.status(400).json({ error: 'CI del cliente es requerido' });
  }

  const safeLimit = Math.min(parseInt(limit, 10) || 50, 100);
  const safeOffset = Math.max(parseInt(offset, 10) || 0, 0);

  try {
    let query = `
      SELECT nro_expediente, u.ubicacion, e.estado, to_char(fecha_hora, 'dd/mm/yy HH24:mi') as fecha, comentario 
      FROM movements 
      INNER JOIN ubicaciones_expedientes u ON movements.id_ubicacion = u.id 
      INNER JOIN estado_expedientes e ON movements.id_estado = e.id 
      INNER JOIN clients c ON movements.cliente_id = c.id 
      WHERE c.doc_num = $1 
    `;
    const params = [ci];

    if (expediente) {
      query += ' AND nro_expediente = $2';
      params.push(expediente);
    }

    query += ` ORDER BY fecha_hora DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(safeLimit, safeOffset);

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener movimientos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getExpedientes = async (req, res) => {
  const { ci } = req.query;

  if (!ci) {
    return res.status(400).json({ error: 'CI del cliente es requerido' });
  }

  try {
    const query = `
      SELECT DISTINCT nro_expediente
      FROM movements
      INNER JOIN clients c ON movements.cliente_id = c.id
      WHERE c.doc_num = $1
      ORDER BY nro_expediente;
    `;

    const result = await pool.query(query, [ci]);
    const expedientes = result.rows.map(row => row.nro_expediente);

    res.json(expedientes);
  } catch (err) {
    console.error('Error al obtener expedientes del cliente:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};