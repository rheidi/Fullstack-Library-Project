import { Book, EditBook, NewBook } from '../../types/Book'
import { PayloadAction, createAsyncThunk, createSlice, isAnyOf, isFulfilled } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'
import { Loan } from '../../types/Loan'

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
    const result = await axios.get<Book[]>(dataSourceUrl)
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
    const result = await axios.get<Book>(`${config.backendUrl}/books/${id}`)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const addNewBook = createAsyncThunk('addNewBook', async (book: NewBook) => {
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

export const editBook = createAsyncThunk('editBook', async (book: EditBook) => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.patch<Book>(`${config.backendUrl}/books`, book, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const deleteBook = createAsyncThunk('deleteBook', async (bookId: string) => {
  try {
    const token = window.localStorage.getItem('token')
    await axios.delete(`${config.backendUrl}/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return bookId
  } catch (e) {
    return e as AxiosError
  }
})

export const loan = createAsyncThunk('loanBook', async (books: Book[]) => {
  try {
    const token = window.localStorage.getItem('token')
    const user = JSON.parse(window.localStorage.getItem('user') ||'{}')
    if (user.id) {
      const result = await Promise.all(books.map(async book => {
        return await axios.post<Loan>(`${config.backendUrl}/loans`, { userId: user.id, bookId: book.id, isReturned: false }, {
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

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearBook: (state, action: PayloadAction) => {
      delete state.book
    },
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
      if (payload === "authorAsc") {
        state.books.sort((a, b) => a.authorName > b.authorName ? -1 : 1)
      } else {
        state.books.sort((a, b) => a.authorName > b.authorName ? 1 : -1)
      }
      
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
          state.book = action.payload
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
      .addMatcher(isFulfilled(deleteBook), (state, action) => {
        state.loading = false
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.books = state.books.filter(book => book.id !== action.payload)
          state.success = `book with id ${action.payload} deleted`
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
export const { clearBook } = bookSlice.actions
