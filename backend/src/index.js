import express from 'express';
import cors from 'cors';

import clientsRoutes from './routes/clients.js';
import movementsRoutes from './routes/movements.js';
import locationRoutes from './routes/file_location.js';
import statusRoutes from './routes/file_status.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test básico
app.get('/ping', (req, res) => {
  res.send('pong');
});

// Rutas reales
app.use('/clients', clientsRoutes);
app.use('/movements', movementsRoutes);
app.use('/locations', locationRoutes);
app.use('/status', statusRoutes);
app.use('/api/auth', authRoutes);

// Fallback para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});