export type CategoryCreateBody = {
  name: string
  slug: string
  description?: string | null
}

export type CategoryUpdateBody = {
  name: string
  slug: string
  description?: string | null
}
