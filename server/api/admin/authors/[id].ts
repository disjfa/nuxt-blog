import { db } from '../../../db/client'
import { authors } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { getErrorMessage } from '../../../utils/error'
import type { AuthorUpdateBody } from '../../../types/authors'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const result = await db.select().from(authors).where(eq(authors.id, id))
      if (result.length === 0) {
        throw new Error('Author not found')
      }
      return {
        status: 'success',
        data: result[0],
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Failed to fetch author'),
      }
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody<AuthorUpdateBody>(event)
      const { name, email, bio, avatar } = body

      await db
        .update(authors)
        .set({
          name,
          email,
          bio: bio || null,
          avatar: avatar || null,
        })
        .where(eq(authors.id, id))

      return {
        status: 'success',
        message: 'Author updated successfully',
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Failed to update author'),
      }
    }
  }

  if (method === 'DELETE') {
    try {
      await db.delete(authors).where(eq(authors.id, id))
      return {
        status: 'success',
        message: 'Author deleted successfully',
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error, 'Failed to delete author'),
      }
    }
  }

  return {
    status: 'error',
    message: 'Method not allowed',
  }
})
