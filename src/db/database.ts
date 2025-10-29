
import { drizzle } from 'drizzle-orm/mysql2';
import type { PoolOptions } from 'mysql2/promise';
import mysql from 'mysql2/promise';

import * as schema from './schema';

const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  ssl: {
        rejectUnauthorized: false
    }
};

const connection = mysql.createPool(dbConfig);

export const db = drizzle(connection, { schema, mode: 'default' });
export default db;