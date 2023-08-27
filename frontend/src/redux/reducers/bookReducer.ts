import { Book, NewBook } from '../../types/Book'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'
import { Author } from '../../types/Author'

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
    // const result = await axios.get<Book[]>(`${config.backendUrl}/books`)
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
    return result.data.id
  } catch (e) {
    return e as AxiosError
  }
})

export const editBook = createAsyncThunk('editBook', async (book: Book) => {
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
  if (first.lastname === second.lastname) {
    if (first.firstname === second.firstname) {
      return (first.birthYear ?? 0) - (second.birthYear ?? 0)
    }
    return first.firstname > second.firstname ? 1 : -1
  }
  return first.lastname > second.lastname ? 1 : -1
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
      state.books.sort((a, b) => payload === 'genreAsc' ? a.genre - b.genre : b.genre - a.genre)
    }
  },
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
      .addCase(fetchBooksBySearchTerm.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.books = action.payload
        }
      })
  }
})

export default bookSlice.reducer
