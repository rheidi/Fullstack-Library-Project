export interface User {
  id: number
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
  role: 'customer' | 'admin' | 'librarian'
}
