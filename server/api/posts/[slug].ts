import { db } from '../../db/client'
import { posts, authors } from '../../db/schema'
import { and, eq } from 'drizzle-orm'
import { getErrorMessage } from '../../utils/error'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const slug = event.context.params?.slug
      if (!slug) {
        return {
          status: 'error',
          message: 'Missing post slug',
        }
      }

      const result = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          content: posts.content,
          excerpt: posts.excerpt,
          status: posts.status,
          createdAt: posts.createdAt,
          publishedAt: posts.publishedAt,
          author: authors.name,
        })
        .from(posts)
        .leftJoin(authors, eq(posts.authorId, authors.id))
        .where(and(eq(posts.slug, slug), eq(posts.status, 'published')))

      if (!result.length) {
        return {
          status: 'error',
          message: 'Post not found',
        }
      }

      return {
        status: 'success',
        data: result[0],
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
