// models/index.js
import { Sequelize } from 'sequelize';
import UserModel from './userModel.js';
import UserDetailsModel from './userDetailsModel.js';
import NoteModel from './noteModel.js';
import TaskModel from './taskModel.js';
import Event from './eventModel.js';

const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host: host,
        dialect: 'postgres',
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize.DataTypes);
db.UserDetails = UserDetailsModel(sequelize, Sequelize.DataTypes);
db.Note = NoteModel(sequelize, Sequelize.DataTypes);
db.Task = TaskModel(sequelize, Sequelize.DataTypes);
db.Event = Event(sequelize, Sequelize.DataTypes);

db.User.hasOne(db.UserDetails, {
    foreignKey: 'userId',
    as: 'details',
});
db.UserDetails.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user',
});

db.User.hasMany(db.Note, {
    foreignKey: 'userId',
    as: 'notes',
});

db.Note.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user',
});

db.User.hasMany(db.Task, {
    foreignKey: 'userId',
    as: 'tasks',
});

db.Task.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user',
});

db.User.hasMany(db.Event, {
    foreignKey: 'userId',
    as: 'events',
});

db.Event.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user',
});

export default db;
