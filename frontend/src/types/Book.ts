import { Genre } from './Genre'

export interface Book {
  id: string
  year: number
  title: string
  authorName: string
  authorId: string
  description: string
  genre: Genre
  image?: string
}

export type NewBook = Omit<Book, 'id'>
export type EditBook = Omit<Book, 'year'| 'title' | 'authorName' | 'authorId'>
