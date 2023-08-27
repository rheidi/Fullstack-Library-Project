import { Author } from './Author'
import { Genre } from './Genre'

export interface Book {
  id: string
  year: number
  title: string
  author: Author
  description: string
  genre: Genre
  image?: string
}

type EditBookBase = Omit<Book, 'author'>
type AuthorAsId = {
  author: string
}

export type EditBook = EditBookBase & AuthorAsId
export type NewBook = Omit<EditBook, 'id'>
