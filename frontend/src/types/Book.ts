import { Author } from './Author'
import { Genre } from './Genre'

export interface Book {
  id: string
  year: number
  title: string
  author: Author
  description: string
  genre: Genre
  imageUrl?: string
}

export type NewBook = Omit<Book, 'id' | 'author'> & {
  authorId: string
}
export type EditBook = Omit<Book, 'year'| 'title' | 'author'>
