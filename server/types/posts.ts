export type PostCreateBody = {
  title: string
  slug: string
  content: string
  excerpt?: string | null
  status?: 'draft' | 'published' | 'archived'
  authorId: number
}

export type PostUpdateBody = {
  title: string
  slug: string
  content: string
  excerpt?: string | null
  status: 'draft' | 'published' | 'archived'
  authorId: number
}
