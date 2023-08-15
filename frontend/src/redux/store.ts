import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './reducers/bookReducer'
import userReducer from './reducers/userReducer'
import cartReducer from './reducers/cartReducer'

const store = configureStore({
  reducer: {
    bookReducer,
    userReducer,
    cartReducer
  }
})

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
