import { Book } from "./Book"

export interface Author {
  id: string
  firstName: string
  lastName: string,
  yearOfBirth?: number
}

export type NewAuthor = Omit<Author, 'id' | 'books'>
export type ListAuthor = Author & {
  books: Book[]
}