import { Book, EditBook, NewBook } from '../../types/Book'
import { PayloadAction, createAsyncThunk, createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'
import { Author } from '../../types/Author'

interface BookReducer {
  books: Book[]
  book?: Book
  loading: boolean
  error: string,
  success?: string
}

const initialState: BookReducer = {
  books: [],
  loading: false,
  error: ''
}

export interface BookFetcherParams {
  pageNumber: number,
  pageSize: number
  search?: string
}

export const fetchAllBooks = createAsyncThunk('fetchAllBooks', async ({ pageNumber = 0, pageSize = 25, search }: BookFetcherParams) => {
  try {
    let dataSourceUrl = `${config.backendUrl}/books?pageNumber=${pageNumber}&pageSize=${pageSize}`
    if (search && search !== '') {
      dataSourceUrl += `&search=${search}`
    }
    // const result = await axios.get<Book[]>(dataSourceUrl)
    const result = require('../../tests/books.json')
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchBooksBySearchTerm = createAsyncThunk('fetchBooksBySearchTerm', async (term: string) => {
  try {
    const result = await axios.get<Book[]>(`${config.backendUrl}/books/search/${term}`)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchOneBook = createAsyncThunk('fetchOneBook', async (id: string | undefined) => {
  try {
    // const result = await axios.get<Book>(`${config.backendUrl}/books/${id}`)
    const result = require('../../tests/books.json')
    // @ts-ignore
    return result.data.find(book => book.id === id)
  } catch (e) {
    return e as AxiosError
  }
})

export const addNewBook = createAsyncThunk('addNewBook', async (book: NewBook) => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.put<Book>(`${config.backendUrl}/books`, book, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const editBook = createAsyncThunk('editBook', async (book: EditBook) => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.post<Book>(`${config.backendUrl}/books`, book, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const loan = createAsyncThunk('loanBook', async (books: Book[]) => {
  try {
    const result = await axios.post(`${config.backendUrl}/loans`, books)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

const sortByAuthor = (a: Author, b: Author, ascending = true) => {
  const first = ascending ? a : b
  const second = ascending ? b : a
  if (first.lastName === second.lastName) {
    if (first.firstName === second.firstName) {
      return (first.yearOfBirth ?? 0) - (second.yearOfBirth ?? 0)
    }
    return first.firstName > second.firstName ? 1 : -1
  }
  return first.lastName > second.lastName ? 1 : -1
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    sortByTitle: (state, action: PayloadAction<'titleAsc' | 'titleDesc'>) => {
      const { payload } = action
      if (payload === "titleAsc") {
        state.books.sort((a, b) => a.title > b.title ? 1 : -1)
      } else {
        state.books.sort((a, b) => a.title > b.title ? -1 : 1)
      }
    }, 
    sortByAuthor: (state, action: PayloadAction<'authorAsc' | 'authorDesc'>) => {
      const { payload } = action
      state.books.sort((a, b) => sortByAuthor(a.author, b.author, payload === 'authorAsc'))
    },
    sortByYear: (state, action: PayloadAction<'yearAsc' | 'yearDesc'>) => {
      const { payload } = action
      state.books.sort((a, b) => payload === 'yearAsc' ? a.year - b.year : b.year - a.year)
    },
    sortByGenre: (state, action: PayloadAction<'genreAsc' | 'genreDesc'>) => {
      const { payload } = action
      state.books.sort((a, b) => {
        if (payload === 'genreAsc') {
          return a.genre > b.genre ? 1 : -1
        } else {
          return b.genre > a.genre ? 1 : -1
        }
      })
    }
  },
  extraReducers: build => {
    build
      .addMatcher(
        isAnyOf(
          fetchAllBooks.pending,
          fetchOneBook.pending,
          fetchBooksBySearchTerm.pending,
          addNewBook.pending,
          editBook.pending,
          loan.pending
        ),
        state => {
          state.loading = true
        }
      )
      .addMatcher(isFulfilled(fetchAllBooks), (state, action) => {
        state.loading = false
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.books = action.payload
        }
      })
      .addMatcher(isFulfilled(fetchOneBook), (state, action) => {
        state.loading = false
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.book = action.payload
        }
      })
      .addMatcher(isFulfilled(fetchBooksBySearchTerm), (state, action) => {
        state.loading = false
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.books = action.payload
        }
      })
      .addMatcher(isFulfilled(addNewBook), (state, action) => {
        state.loading = false
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.success = `Book created with id: ${action.payload.id} as ${action.payload.title}`
        }
      })
      .addMatcher(isFulfilled(editBook), (state, action) => {
        state.loading = false
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.success = `Book with id: ${action.payload.id} updated as ${action.payload.title}`
        }
      })
      .addMatcher(
        isAnyOf(
          fetchAllBooks.rejected,
          fetchOneBook.rejected,
          fetchBooksBySearchTerm.rejected,
          addNewBook.rejected,
          editBook.rejected,
          loan.rejected
        ), (state, action) => {
          state.error = action.error.message ?? 'Something went wrong'
        }
      )
  }
})

export default bookSlice.reducer
