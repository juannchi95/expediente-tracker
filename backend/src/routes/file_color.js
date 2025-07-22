import express from 'express';
import { getAllColors } from '../controllers/file_color.js';

const router = express.Router();
router.get('/', getAllColors);

export default router;