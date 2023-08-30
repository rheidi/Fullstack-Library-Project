import { Book } from "./Book"
import { User } from "./User"

export interface Loan {
  id: string
  bookId: string
  userId: string
  isReturned: boolean
}

export interface LoanReadDto {
  id: string
  book: Book
  user: User
  isReturned: boolean
}