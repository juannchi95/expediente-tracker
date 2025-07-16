import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import pool from '../db/connection.js';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en el entorno');
}

const JWT_SECRET = process.env.JWT_SECRET;

const JWT_EXPIRES_IN = '15m';

export const registerUser = async (req, res) => {
  const { username, email, password, full_name } = req.body;

  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id
    });

    const result = await pool.query(
      `INSERT INTO users (username, email, password_hash, full_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, role`,
      [username, email, hash, full_name]
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const valid = await argon2.verify(user.password_hash, password);

    if (!valid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};