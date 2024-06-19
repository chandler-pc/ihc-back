import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/get/:id', getProfile);
router.post('/update/:id', updateProfile);

export default router;