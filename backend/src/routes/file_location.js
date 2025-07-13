import express from 'express';
import { getAllLocations } from '../controllers/file_location.js';

const router = express.Router();
router.get('/', getAllLocations);

export default router;