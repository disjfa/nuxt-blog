import { drizzle } from 'drizzle-orm/mysql2'
import pool from './index'

export const db = drizzle(pool)
