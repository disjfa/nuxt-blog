import { createPool } from 'mysql2/promise'

const pool = createPool({
  host: process.env.NUXT_DATABASE_HOST || '127.0.0.1',
  port: parseInt(process.env.NUXT_DATABASE_PORT || '3306'),
  database: process.env.NUXT_DATABASE_NAME || 'nuxt_blog',
  user: process.env.NUXT_DATABASE_USER || 'root',
  password: process.env.NUXT_DATABASE_PASSWORD || 'password',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
