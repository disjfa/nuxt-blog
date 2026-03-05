import { db } from '../../../db/client'
import { posts } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { getErrorMessage } from '../../../utils/error'
import type { PostUpdateBody } from '../../../types/posts'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const result = await db.select().from(posts).where(eq(posts.id, id))
      if (result.length === 0) {
        throw new Error('Post not found')
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

  if (method === 'PUT') {
    try {
      const body = await readBody<PostUpdateBody>(event)
      const { title, slug, content, excerpt, status, authorId } = body

      await db
        .update(posts)
        .set({
          title,
          slug,
          content,
          excerpt,
          status,
          authorId,
        })
        .where(eq(posts.id, id))

      return {
        status: 'success',
        message: 'Post updated successfully',
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error),
      }
    }
  }

  if (method === 'DELETE') {
    try {
      await db.delete(posts).where(eq(posts.id, id))
      return {
        status: 'success',
        message: 'Post deleted successfully',
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
