import { db } from '../db/client'
import { authors } from '../db/schema'

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message
  return 'Failed to connect to database'
}

export default defineEventHandler(async () => {
  try {
    const result = await db.select().from(authors)
    return {
      status: 'success',
      data: result,
      message: 'Database connection successful',
    }
  } catch (error) {
    return {
      status: 'error',
      message: getErrorMessage(error, 'Failed to connect to database'),
    }
  }
})
