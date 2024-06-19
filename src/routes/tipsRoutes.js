import express from 'express';
import { phrase, tips } from '../controllers/tipsController.js';

const router = express.Router();

router.get('/', tips);
router.get('/phrase', phrase);

export default router;
