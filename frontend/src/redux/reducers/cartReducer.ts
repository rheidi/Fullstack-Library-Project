import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Book } from '../../types/Book'

interface ProductReducer {
  books: Book[]
}

const initialState: ProductReducer = {
  books: []
}

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
  }
})

const cartReducer = cartSlice.reducer
export const { addToCart, emptyCart, removeFromCart } = cartSlice.actions
export default cartReducer
