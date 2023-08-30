import { User } from "../types/User";

export const isAdmin = (user: User | undefined) => {
  return user && user.role === 'Admin'
}
