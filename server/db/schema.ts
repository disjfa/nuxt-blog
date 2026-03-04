import { mysqlTable, int, varchar, text, timestamp, mysqlEnum } from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

export const posts = mysqlTable('posts', {
  id: int().primaryKey().autoincrement(),
  title: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  content: text().notNull(),
  excerpt: varchar({ length: 500 }),
  status: mysqlEnum(['draft', 'published', 'archived']).default('draft').notNull(),
  authorId: int().notNull(),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
  publishedAt: timestamp(),
})

export const authors = mysqlTable('authors', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  bio: text(),
  avatar: varchar({ length: 500 }),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export const categories = mysqlTable('categories', {
  id: int().primaryKey().autoincrement(),
  name: varchar({ length: 255 }).notNull().unique(),
  slug: varchar({ length: 255 }).notNull().unique(),
  description: text(),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})

export const postCategories = mysqlTable('post_categories', {
  postId: int().notNull(),
  categoryId: int().notNull(),
})

export const comments = mysqlTable('comments', {
  id: int().primaryKey().autoincrement(),
  postId: int().notNull(),
  authorName: varchar({ length: 255 }).notNull(),
  authorEmail: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  status: mysqlEnum(['pending', 'approved', 'spam']).default('pending').notNull(),
  createdAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp()
    .default(sql`CURRENT_TIMESTAMP`)
    .onUpdateNow()
    .notNull(),
})
