import { db } from '../../../db/client'
import { comments } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { getErrorMessage } from '../../../utils/error'
import type { CommentUpdateBody } from '../../../types/comments'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  const method = event.node.req.method

  if (method === 'PUT') {
    try {
      const body = await readBody<CommentUpdateBody>(event)
      const { status } = body

      await db
        .update(comments)
        .set({
          status,
        })
        .where(eq(comments.id, id))

      return {
        status: 'success',
        message: 'Comment updated successfully',
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Failed to update comment'),
      }
    }
  }

  if (method === 'DELETE') {
    try {
      await db.delete(comments).where(eq(comments.id, id))
      return {
        status: 'success',
        message: 'Comment deleted successfully',
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Failed to delete comment'),
      }
    }
  }

  return {
    status: 'error',
    message: 'Method not allowed',
  }
})
