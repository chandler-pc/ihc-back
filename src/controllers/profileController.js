import db from '../models/index.js';

export const getProfile = async (req, res) => {
    const userId = req.params.id;
    const user = await db.UserDetails.findOne({ where: { userId } });
    res.json(user);
};

export const updateProfile = async (req, res) => {
    const userId = req.params.id;
    const { name, lastName, university, birthDate } = req.body;
    await db.UserDetails.update({ name, lastName, university, birthDate }, { where: { userId } });
    res.json({ code:200,message: 'Profile updated!' });
}