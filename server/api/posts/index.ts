import { db } from '../../db/client'
import { posts, authors } from '../../db/schema'
import { desc, eq, count } from 'drizzle-orm'
import { getErrorMessage } from '../../utils/error'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const page = Math.max(1, Number(query.page) || 1)
      const limit = Math.min(50, Math.max(1, Number(query.limit) || 10))
      const offset = (page - 1) * limit

      const countResult = await db
        .select({ total: count() })
        .from(posts)
        .where(eq(posts.status, 'published'))
      const total = countResult[0]?.total ?? 0

      const data = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          excerpt: posts.excerpt,
          createdAt: posts.createdAt,
          publishedAt: posts.publishedAt,
          author: authors.name,
        })
        .from(posts)
        .leftJoin(authors, eq(posts.authorId, authors.id))
        .where(eq(posts.status, 'published'))
        .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
        .limit(limit)
        .offset(offset)

      return {
        status: 'success',
        data,
        meta: {
          total,
          page,
          limit,
          pageCount: Math.max(1, Math.ceil(total / limit)),
        },
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error),
      }
    }
  }

  return {
    status: 'error',
    message: 'Method not allowed',
  }
})
