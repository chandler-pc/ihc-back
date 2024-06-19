import express from 'express';
import { startChat, chat } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', startChat);
router.post('/', chat);

export default router;
