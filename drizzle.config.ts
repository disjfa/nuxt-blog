import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './server/db/schema.ts',
  out: './server/db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.NUXT_DATABASE_HOST || '127.0.0.1',
    port: parseInt(process.env.NUXT_DATABASE_PORT || '3306'),
    user: process.env.NUXT_DATABASE_USER || 'root',
    password: process.env.NUXT_DATABASE_PASSWORD || 'password',
    database: process.env.NUXT_DATABASE_NAME || 'nuxt_blog',
  },
})
