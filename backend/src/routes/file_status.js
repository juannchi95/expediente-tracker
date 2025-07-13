import express from 'express';
import { getStatusByLocation } from '../controllers/file_status.js';

const router = express.Router();
router.get('/', getStatusByLocation);

export default router;