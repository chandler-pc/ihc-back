import express from 'express';
import {getEventsByUser, addEventByUser} from '../controllers/eventsController.js';

const router = express.Router();

router.get('/:userId', getEventsByUser);
router.post('/:userId', addEventByUser);

export default router;