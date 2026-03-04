import { db } from '../../../db/client'
import { authors } from '../../../db/schema'
import { getErrorMessage } from '../../../utils/error'
import type { AuthorCreateBody } from '../../../types/authors'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const allAuthors = await db.select().from(authors)
      return {
        status: 'success',
        data: allAuthors,
      }
    } catch (error) {
      return {
        status: 'error',
        message: getErrorMessage(error),
      }
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody<AuthorCreateBody>(event)
      const { name, email, bio, avatar } = body

      await db.insert(authors).values({
        name,
        email,
        bio: bio || null,
        avatar: avatar || null,
      })

      return {
        status: 'success',
        message: 'Author created successfully',
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
