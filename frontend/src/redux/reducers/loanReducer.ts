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
    const result = await axios.get<Loan[]>(`${config.backendUrl}/loans`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // this is a temporary solution until I figure out what is the matter with ef core relations
    return await Promise.all(result.data.map(async (loan) => {
      const user = await axios.get<User>(`${config.backendUrl}/users/${loan.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const book = await axios.get<Book>(`${config.backendUrl}/books/${loan.bookId}`)
      return { id: loan.id, user: user.data, book: book.data, isReturned: loan.isReturned }
    }))
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchUserLoans = createAsyncThunk('fetchUserLoans', async (user: User) => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.get<Loan[]>(`${config.backendUrl}/loans/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return await Promise.all(result.data.map(async loan => {
      const book = await axios.get<Book>(`${config.backendUrl}/books/${loan.bookId}`)
      return { id: loan.id, user, book: book.data, isReturned: loan.isReturned }
    }))
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
