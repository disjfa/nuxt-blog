import { db } from '../../../db/client'
import { categories } from '../../../db/schema'
import { eq } from 'drizzle-orm'
import { getErrorMessage } from '../../../utils/error'
import type { CategoryUpdateBody } from '../../../types/categories'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  const method = event.node.req.method

  if (method === 'PUT') {
    try {
      const body = await readBody<CategoryUpdateBody>(event)
      const { name, slug, description } = body

      await db
        .update(categories)
        .set({
          name,
          slug,
          description: description || null,
        })
        .where(eq(categories.id, id))

      return {
        status: 'success',
        message: 'Category updated successfully',
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
      await db.delete(categories).where(eq(categories.id, id))
      return {
        status: 'success',
        message: 'Category deleted successfully',
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
