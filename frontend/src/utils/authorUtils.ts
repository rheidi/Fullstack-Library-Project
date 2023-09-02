import { Author } from "../types/Author"

export const formatAuthorName = (author: Author) => {
  return `${author.firstName} ${author.lastName} ${author.yearOfBirth ? `(${author.yearOfBirth})`: ''}`
}

export const formatAuthorShortname = (author: Author) => {
  return `${author.firstName} ${author.lastName}`
}