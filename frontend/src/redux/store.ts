import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './reducers/bookReducer'
import userReducer from './reducers/userReducer'
import cartReducer from './reducers/cartReducer'
import authorReducer from './reducers/authorReducer'
import loanReducer from './reducers/loanReducer'

const store = configureStore({
  reducer: {
    authorReducer,
    bookReducer,
    cartReducer,
    loanReducer,
    userReducer
  }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
