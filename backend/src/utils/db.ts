import { Pool } from 'pg';

const pool = new Pool({
  user: 'yourUsername',
  host: 'localhost',
  database: 'task_manager',
  password: '123456789',
  port: 5432,
});

export default pool;
