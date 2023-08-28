import { Author } from "../types/Author"

export const formatAuthorName = (author: Author) => {
  return `${author.lastName}, ${author.firstName} ${author.yearOfBirth ? `(${author.yearOfBirth})`: ''}`
}