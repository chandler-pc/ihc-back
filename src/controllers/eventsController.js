import db from '../models/index.js';

export const getEventsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const events = await db.Event.findAll({ where: { userId } });
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los eventos', error });
    }
};

export const addEventByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, start, end, allDay } = req.body;
        const event = await db.Event.create({ title, start, end,allDay, userId });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el evento', error });
    }
}