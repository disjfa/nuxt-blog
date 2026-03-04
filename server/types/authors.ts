export type AuthorCreateBody = {
  name: string
  email: string
  bio?: string | null
  avatar?: string | null
}

export type AuthorUpdateBody = {
  name: string
  email: string
  bio?: string | null
  avatar?: string | null
}
