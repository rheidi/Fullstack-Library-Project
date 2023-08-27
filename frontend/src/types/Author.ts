export interface Author {
  id: string
  firstname: string
  lastname: string,
  birthYear?: string
}

export type NewAuthor = Omit<Author, 'id'>
