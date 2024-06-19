import express from 'express';
import { getTasksFromUser, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/:userId', getTasksFromUser);
router.post('/:userId', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
