import { Book } from "./Book"

export interface Author {
  id: string
  firstName: string
  lastName: string,
  yearOfBirth?: number
  books: Book[]
}

export type NewAuthor = Omit<Author, 'id' | 'books'>
export type ListAuthor = Omit<Author, 'books'>