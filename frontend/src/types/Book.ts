import { Author } from './Author'
import { Genre } from './Genre'

export interface Book {
  id: string
  year: number
  title: string
  author?: Author
  description: string
  genre: Genre
  image?: string
}

export type NewBook = Omit<Book, 'id'>
