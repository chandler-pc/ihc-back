import db from '../models/index.js';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Password does not match' });
    }

    const token = jwt.sign({ id: user.id },
        'meowmeowmeow');
    return res.json({ token });
}