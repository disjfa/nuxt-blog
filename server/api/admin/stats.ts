import { db } from '../../db/client'
import { posts, categories, authors, comments } from '../../db/schema'
import { count } from 'drizzle-orm'

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return 'Failed to fetch stats'
}

export default defineEventHandler(async () => {
  try {
    const [postsCount, categoriesCount, authorsCount, commentsCount] = await Promise.all([
      db.select({ count: count() }).from(posts),
      db.select({ count: count() }).from(categories),
      db.select({ count: count() }).from(authors),
      db.select({ count: count() }).from(comments),
    ])

    return {
      status: 'success',
      data: {
        posts: postsCount[0]?.count || 0,
        categories: categoriesCount[0]?.count || 0,
        authors: authorsCount[0]?.count || 0,
        comments: commentsCount[0]?.count || 0,
      },
    }
  } catch (error) {
    return {
      status: 'error',
      message: getErrorMessage(error),
    }
  }
})
