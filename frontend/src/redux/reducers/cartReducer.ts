import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Book } from '../../types/Book'
import axios, { AxiosError } from 'axios'
import config from '../../config'
import { User } from '../../types/User'
import { Exception } from 'sass'

interface CartReducer {
  books: Book[]
  error: string
  loading: boolean
}

const initialState: CartReducer = {
  books: [],
  error: '',
  loading: false
}

type State = {
  user: User
}

export const loanBooks = createAsyncThunk<Book[], Book[], { state: State }>(
  'cart/loan',
  async (books, { getState }) => {
    const state = getState()
    const token = window.localStorage.getItem('token')
    try {
      const loanedBooks: Book[] = []
      if (!token) throw new Error('Cannot authenticate');
      await Promise.all(books.map(async book => {
        const loanResult = await axios.post(`${config.backendUrl}/loans`, {
          UserId: state.user.id,
          BookId: book.id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if (loanResult.data) {
          loanedBooks.push(book)
        }
      }))

      return loanedBooks
    } catch (e) {
      throw e
    }
})

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    emptyCart: state => {
      window.localStorage.removeItem('cart')
      return initialState
    },
    addToCart: (state, action: PayloadAction<Book>) => {
      const newBook = action.payload
      const book = newBook
      state.books.push(book)
      window.localStorage.setItem('cart', JSON.stringify(state.books))
    },
    removeFromCart: (state, action: PayloadAction<Book>) => {
      state.books = state.books.filter(b => b.id !== action.payload.id)
      window.localStorage.setItem('cart', JSON.stringify(state.books))
    }
  },
  extraReducers: builder => {
    builder.addCase(loanBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
      if (action.payload instanceof AxiosError) {
        state.error = action.payload.message
      } else {
        state.error = ''
        state.books = []
      }
      state.loading = false
    })
  }
})

const cartReducer = cartSlice.reducer
export const { addToCart, emptyCart, removeFromCart } = cartSlice.actions
export default cartReducer
