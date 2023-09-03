import { Author, ListAuthor } from "../types/Author"

export const formatAuthorName = (author: ListAuthor | Author) => {
  return `${author.firstName} ${author.lastName} ${author.yearOfBirth ? `(${author.yearOfBirth})`: ''}`
}

export const formatAuthorShortname = (author: ListAuthor | Author) => {
  return `${author.firstName} ${author.lastName}`
}