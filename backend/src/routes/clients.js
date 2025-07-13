import express from 'express';
import { getClientByCI } from '../controllers/clients.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/ci/:ci', getClientByCI);

export default router;