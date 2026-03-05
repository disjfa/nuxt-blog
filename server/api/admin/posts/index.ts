import { db } from '../../../db/client'
import { posts, authors } from '../../../db/schema'
import { desc, eq, count } from 'drizzle-orm'
import { getErrorMessage } from '../../../utils/error'
import type { PostCreateBody } from '../../../types/posts'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const page = Math.max(1, Number(query.page) || 1)
      const limit = Math.min(100, Math.max(1, Number(query.limit) || 10))
      const offset = (page - 1) * limit

      const countResult = await db.select({ total: count() }).from(posts)
      const total = countResult[0]?.total ?? 0

      const allPosts = await db
        .select({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          status: posts.status,
          createdAt: posts.createdAt,
          authorId: posts.authorId,
          author: authors.name,
        })
        .from(posts)
        .leftJoin(authors, eq(posts.authorId, authors.id))
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset)

      return {
        status: 'success',
        data: allPosts,
        meta: {
          total,
          page,
          limit,
          pageCount: Math.ceil(total / limit),
        },
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
      const body = await readBody<PostCreateBody>(event)
      const { title, slug, content, excerpt, status, authorId } = body

      await db.insert(posts).values({
        title,
        slug,
        content,
        excerpt,
        status: status || 'draft',
        authorId,
      })

      return {
        status: 'success',
        message: 'Post created successfully',
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
