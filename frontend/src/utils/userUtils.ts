import { User } from "../types/User";

export const isAdmin = (user: User) => {
  return user.role === 'Admin'
}
