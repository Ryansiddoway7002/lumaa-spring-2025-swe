import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';
import { register, login } from './controllers/authController';
import { createTask, getTasks, updateTask, deleteTask } from './controllers/taskController';
import authMiddleware from './middlewares/authMiddleware';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'taskmanager',
  password: 'yourPassword',
  port: 5432,
});

app.post('/register', register);
app.post('/login', login);

app.use(authMiddleware);

app.post('/tasks', createTask);
app.get('/tasks', getTasks);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

export { pool };
