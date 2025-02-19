import { Request, Response } from 'express';
import { pool } from '../index';

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = req.user.userId;
  await pool.query('INSERT INTO tasks (user_id, title) VALUES ($1, $2)', [userId, title]);
  res.send('Task created');
};

export const getTasks = async (req: Request, res: Response) => {
  const userId = req.user.userId;
  const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
  res.json(tasks.rows);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const userId = req.user.userId;
  await pool.query('UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 AND user_id = $4', [title, completed, id, userId]);
  res.send('Task updated');
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;
  await pool.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
  res.send('Task deleted');
};
