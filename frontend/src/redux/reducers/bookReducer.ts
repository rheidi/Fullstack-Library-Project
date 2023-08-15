import { Book, NewBook } from '../../types/Book'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'

interface BookReducer {
  books: Book[]
  book?: Book
  loading: boolean
  error: string
}

const initialState: BookReducer = {
  books: [],
  loading: false,
  error: ''
}

export const fetchAllBooks = createAsyncThunk('fetchAllBooks', async () => {
  try {
    const result = await axios.get<Book[]>(`${config.backendUrl}/books`)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchOneBook = createAsyncThunk('fetchOneBook', async (id: string | undefined) => {
  try {
    const result = await axios.get<Book>(`${config.backendUrl}/books/${id}`)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const addNewBook = createAsyncThunk('addNewBook', async (book: NewBook) => {
  try {
    const result = await axios.post<Book>(`${config.backendUrl}/books`, book)
    return result.data.id
  } catch (e) {
    return e as AxiosError
  }
})

export const editBook = createAsyncThunk('editBook', async (book: Book) => {
  try {
    const result = await axios.post<Book>(`${config.backendUrl}/books`, book)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const loan = createAsyncThunk('loanBook', async (books: Book[]) => {
  try {
    await axios.post(`${config.backendUrl}/loans`, books)
  } catch (e) {
    return e as AxiosError
  }
})

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: build => {
    build
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.books = action.payload
        }
      })
      .addCase(fetchOneBook.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.book = action.payload
        }
      })
  }
})

export default bookSlice.reducer
