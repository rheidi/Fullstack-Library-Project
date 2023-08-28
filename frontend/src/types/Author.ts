export interface Author {
  id: string
  firstName: string
  lastName: string,
  yearOfBirth?: number
}

export type NewAuthor = Omit<Author, 'id'>
