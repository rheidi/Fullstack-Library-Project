import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'
import { Loan, LoanReadDto } from '../../types/Loan'
import { User } from '../../types/User'
import { Book } from '../../types/Book'

interface LoanReducer {
  loans: LoanReadDto[]
  loan?: LoanReadDto
  loading: boolean
  error: string
}

const initialState: LoanReducer = {
  loans: [],
  loading: false,
  error: ''
}

export const fetchAllLoans = createAsyncThunk('fetchAllLoans', async () => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.get<LoanReadDto[]>(`${config.backendUrl}/loans`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(result.data)
    return result.data ?? []
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchUserLoans = createAsyncThunk('fetchUserLoans', async (user: User) => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.get<LoanReadDto[]>(`${config.backendUrl}/loans/userloans?id=${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchOneLoan = createAsyncThunk('fetchOneLoan', async (id: string) => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.get<Loan>(`${config.backendUrl}/loans/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const { bookId, userId } = result.data
    const book = await axios.get<Book>(`${config.backendUrl}/book/${bookId}`)
    const user = await axios.get<User>(`${config.backendUrl}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return { id, book: book.data, user: user.data, isReturned: result.data.isReturned }
  } catch (e) {
    return e as AxiosError
  }
})

export const returnLoan = createAsyncThunk('returnLoan', async (loan: LoanReadDto) => {
    const token = window.localStorage.getItem('token')
    const returnedLoan = { isReturned: true }
    await axios.patch<Loan>(`${config.backendUrl}/loans/${loan.id}`, returnedLoan, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return { ...loan, isReturned: true }
})

export const loanSingleBook = createAsyncThunk('loanBook', async (books: Book[]) => {
  try {
    const token = window.localStorage.getItem('token')
    const user = JSON.parse(window.localStorage.getItem('user') ||'{}')
    if (user.id) {
      const result = await Promise.all(books.map(async book => {
        return await axios.post<Loan>(`${config.backendUrl}/loans`, { userId: user.id, bookId: book.id }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      }))
      return result
    }
  } catch (e) {
    return e as AxiosError
  }
})

const loanSlice = createSlice({
  name: 'loanSlice',
  initialState,
  reducers: {},
  extraReducers: build => {
    build
      .addCase(fetchAllLoans.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.loans = action.payload
        }
      })
      .addCase(fetchOneLoan.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.loan = action.payload
        }
      })
      .addCase(fetchUserLoans.fulfilled,  (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.loans = action.payload
        }
      })
      .addCase(returnLoan.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          const returned = action.payload
          state.loans = state.loans.map(loan => loan.id === returned.id ? returned : loan)
        }
      })
  }
})

export default loanSlice.reducer
