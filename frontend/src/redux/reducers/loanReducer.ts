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
    const result = await axios.get<Loan[]>(`${config.backendUrl}/loans`)
    // this is a temporary solution until I figure out what is the matter with ef core relations
    return await Promise.all(result.data.map(async (loan) => {
      const user = await axios.get<User>(`${config.backendUrl}/users/${loan.userId}`)
      const book = await axios.get<Book>(`${config.backendUrl}/books/${loan.bookId}`)
      return { id: loan.id, user: user.data, book: book.data }
    }))
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchOneLoan = createAsyncThunk('fetchOneLoan', async (id: string) => {
  try {
    const result = await axios.get<Loan>(`${config.backendUrl}/loans/${id}`)
    const { bookId, userId } = result.data
    const book = await axios.get<Book>(`${config.backendUrl}/book/${bookId}`)
    const user = await axios.get<User>(`${config.backendUrl}/user/${userId}`)
    return { id, book: book.data, user: user.data }
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
  }
})

export default authorSlice.reducer
