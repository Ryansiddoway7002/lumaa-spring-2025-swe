import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../index';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
  res.send('User registered');
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

  if (user.rows.length === 0) {
    return res.status(400).send('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }

  const token = jwt.sign({ userId: user.rows[0].id }, 'yourSecretKey');
  res.json({ token });
};
