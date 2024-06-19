import db from '../models/index.js';

export const register = async (req, res) => {
    try {
        const { user, email, password} = req.body;

        if (!user || !email || !password) {
            return res.status(400).json({ code: 400, message: 'Todos los campos obligatorios deben ser completados' });
        }
        let existingUser = await db.User.findOne({ where: { user } });
        if (existingUser) {
            return res.status(409).json({ code: 409, message: 'El usuario ya está registrado' });
        }
        existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ code: 409, message: 'El correo electrónico ya está registrado' });
        }

        const newUser = await db.User.create({ user, email, password });

        const userDetails = await db.UserDetails.create({
            userId: newUser.id
        });

        res.status(201).json({ code: 201, message: 'Nuevo usuario creado', data: { user: newUser, details: userDetails } });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(422).json({ code: 422, message: 'Error de validación', errors: error.errors.map(e => e.message) });
        }
        res.status(500).json({ code: 500, message: 'Error interno del servidor', error: error.message });
    }
    
};
