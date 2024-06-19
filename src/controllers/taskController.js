import db from '../models/index.js';
import crypto from 'crypto';

export const createTask = async (req, res) => {
    try {
        let userId = req.params.userId;
        let { title, description, expire, dificulty } = req.body;
        title = title.trim();
        const hash = crypto.createHash('md5').update(title).digest('hex');
        
        let existingTask = await db.Task.findOne({ where: { userId, hash } });
        if (existingTask) {
            return res.status(409).json({ code: 409, message: 'La tarea ya existe' });
        }

        const newTask = await db.Task.create({ title, hash, userId, description, expire, dificulty });

        res.status(201).json({ code: 201, message: 'Tarea creada', data: newTask });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: 'Error al crear la tarea', error });
    }

}

export const getTasksFromUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tasks = await db.Task.findAll({ where: { userId } });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al obtener las tareas', error });
    }
}

export const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, expire, dificulty } = req.body;
        const task = await db.Task.findOne({ where: { id } });

        if (!task) {
            return res.status(404).json({ code: 404, message: 'Tarea no encontrada' });
        }

        task.title = title;
        task.description = description;
        task.expire = expire;
        task.dificulty = dificulty;

        await task.save();

        res.status(200).json({ code: 200, message: 'Tarea actualizada', data: task });
    }
    catch (error) {
        res.status(400).json({ code: 400, message: 'Error al actualizar la tarea', error });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await db.Task.findOne({ where: { id } });

        if (!task) {
            return res.status(404).json({ code: 404, message: 'Tarea no encontrada' });
        }

        await task.destroy();

        res.status(200).json({ code: 200, message: 'Tarea eliminada' });
    }
    catch (error) {
        res.status(400).json({ code: 400, message: 'Error al eliminar la tarea', error });
    }
}


