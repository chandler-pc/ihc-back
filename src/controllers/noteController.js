import db from '../models/index.js';
import crypto from 'crypto';

export const createNote = async (req, res) => {
  try {
    const userId = req.params.userId;
    let { title} = req.body;
    title = title.trim();
    const hash = crypto.createHash('md5').update(title).digest('hex');

    let existingUrl = await db.Note.findOne({ where: { userId, hash } });
    if (existingUrl) {
      return res.status(409).json({ code: 409, message: 'El titulo ya existe' });
    }

    const newNote = await db.Note.create({ title, hash, userId });

    res.status(201).json({ code: 201, message: 'Nota creada', data: newNote });
  } catch (error) {
    console.log(error);
    res.status(400).json({ code: 400, message: 'Error al crear la nota', error });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await db.Note.findAll({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['user', 'email'],
        },
      ],
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las notas', error });
  }
};

export const getNotesFromUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notes = await db.Note.findAll({ where: { userId } });
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las notas', error });
  }
};

export const getNoteNames = async (req, res) => {
  try {
    const userId = req.params.userId;
    const noteHash = req.params.hash;
    const note = await db.Note.findOne({ where: { hash: noteHash, userId } });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    res.status(200).json({title: note.title , names: note.names });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error al obtener los nombres de la nota', error });
  }
};

export const addNamesToNote = async (req, res) => {
  try {
    const userId = req.params.userId;
    const noteHash = req.params.hash;
    const { newName } = req.body;

    const note = await db.Note.findOne({ where: { hash: noteHash, userId } });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    if(!note.names) {
      note.names = [];
      note.descriptions = [];
    }

    if(note.names.includes(newName)) {
      return res.status(409).json({ message: 'El nombre ya existe en la nota' });
    }

    const updatedNames = [...note.names, newName];
    const updatedDescriptions = [...note.descriptions, ''];

    note.names = updatedNames;
    note.descriptions = updatedDescriptions;
    await note.save();

    res.status(201).json({ code:201, message: 'Nombre añadido', newName: newName });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error al añadir nombres a la nota', error });
  }
};

export const updateNoteDescription = async (req, res) => {
  try {
    const userId = req.params.userId;
    const noteHash = req.params.hash;
    const name = req.params.name;
    const {description} = req.body;

    const note = await db.Note.findOne({ where: { hash: noteHash, userId } });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    const nameIndex = note.names.indexOf(name);
    if (nameIndex === -1) {
      return res.status(404).json({ message: 'Nombre no encontrado en la nota' });
    }

    note.descriptions[nameIndex] = description;
    note.changed('descriptions', true);
    await note.save();

    res.status(200).json({ code:200, message: 'Descripcion actualizada',description });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error al actualizar la descripcion de la nota', error });
  }
}

export const getDescriptionByName = async (req, res) => {
  try {
    const hash = req.params.hash;
    const name = req.params.name;

    const note = await db.Note.findOne({ where: { hash } });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    const nameIndex = note.names.indexOf(name);
    if (nameIndex === -1) {
      return res.status(404).json({ message: 'Nombre no encontrado en la nota' });
    }

    const description = note.descriptions[nameIndex];
    res.status(200).json({ code:200, message: 'Descripcion obtenida', description, title: note.title, name});
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error al obtener la descripcion de la nota', error });
  }
}

export const deleteNote = async (req, res) => {
  try {
    const userId = req.params.userId;
    const hash = req.params.hash;

    const note = await db.Note.findOne({ where: { hash, userId } });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    await note.destroy();
    res.status(200).json({ code:200, message: 'Nota eliminada', title: note.title });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error al eliminar la nota', error });
  }
}

export const deleteNameFromNote = async (req, res) => {
  try {
    const userId = req.params.userId;
    const hash = req.params.hash;
    const {name} = req.body;

    const note = await db.Note.findOne({ where: { hash, userId } });

    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    const nameIndex = note.names.indexOf(name);
    if (nameIndex === -1) {
      return res.status(404).json({ message: 'Nombre no encontrado en la nota' });
    }

    note.names.splice(nameIndex, 1);
    note.descriptions.splice(nameIndex, 1);
    note.changed('names', true);
    note.changed('descriptions', true);
    await note.save();

    res.status(200).json({ code:200, message: 'Nombre eliminado', name });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error al eliminar el nombre de la nota', error });
  }
}
