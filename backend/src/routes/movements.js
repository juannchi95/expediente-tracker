import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import {
  createMovement,
  getMovements,
  getExpedientes
} from '../controllers/movements.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createMovement);
router.get('/', getMovements);
router.get('/expedientes', getExpedientes);

export default router;