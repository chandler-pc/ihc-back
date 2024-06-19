import express from 'express';
import { summarize } from '../controllers/summarizeController.js';

const router = express.Router();

router.post('/', summarize);

export default router;
