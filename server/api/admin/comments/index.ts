import { db } from '../../../db/client'
import { comments, posts } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { getErrorMessage } from '../../../utils/error'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const allComments = await db
        .select({
          id: comments.id,
          authorName: comments.authorName,
          authorEmail: comments.authorEmail,
          content: comments.content,
          status: comments.status,
          postId: comments.postId,
          createdAt: comments.createdAt,
          postTitle: posts.title,
        })
        .from(comments)
        .innerJoin(posts, eq(comments.postId, posts.id))

      return {
        status: 'success',
        data: allComments,
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
