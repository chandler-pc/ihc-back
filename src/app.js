import express from 'express';
import cors from 'cors';
import summarizeRoutes from './routes/summarizeRoutes.js';
import registerRoutes from './routes/registerRoutes.js';
import tipsRoutes from './routes/tipsRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import loginRoutes from './routes/loginRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import eventsRouter from './routes/eventsRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/summarize', summarizeRoutes);
app.use('/register', registerRoutes);
app.use('/tips', tipsRoutes);
app.use('/notes', notesRoutes);
app.use('/chat', chatRoutes);
app.use('/search', searchRoutes);
app.use('/tasks', taskRoutes);
app.use('/login', loginRoutes);
app.use('/profile', profileRoutes);
app.use('/events', eventsRouter);

export {app};