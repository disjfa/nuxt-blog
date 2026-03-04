import { db } from '../../../db/client'
import { categories } from '../../../db/schema'
import { getErrorMessage } from '../../../utils/error'
import type { CategoryCreateBody } from '../../../types/categories'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const allCategories = await db.select().from(categories)
      return {
        status: 'success',
        data: allCategories,
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
      const body = await readBody<CategoryCreateBody>(event)
      const { name, slug, description } = body

      await db.insert(categories).values({
        name,
        slug,
        description: description || null,
      })

      return {
        status: 'success',
        message: 'Category created successfully',
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
