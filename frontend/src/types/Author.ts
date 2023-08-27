export interface Author {
  id: string
  firstname: string
  lastname: string,
  birthYear?: number
}

export type NewAuthor = Omit<Author, 'id'>
