import { User } from '../../types/User'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import config from '../../config'
import axios, { AxiosError } from 'axios'
import { NewUser } from '../../types/NewUser'
import { UserCredential } from '../../types/UserCredential'
import { access } from 'fs'

interface UserReducer {
  users: User[]
  currentUser?: User
  loading: boolean
  error: string
}

const initialState: UserReducer = {
  users: [],
  loading: false,
  error: ''
}

export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
  try {
    const token = window.localStorage.getItem('token')
    const result = await axios.get<User[]>(`${config.backendUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return result.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const newUser = createAsyncThunk('newUser', async (newUser: NewUser) => {
  try {
    const result = await axios.post<User>(`${config.backendUrl}/users`, newUser)
    return result.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

export const deleteUser = createAsyncThunk('deleteUser', async (userId: string) => {
  try {
    const token = window.localStorage.getItem('token')
    await axios.delete(`${config.backendUrl}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return userId
  } catch (e) {
    return e as AxiosError
  }
})

export const login = createAsyncThunk('login', async ({ email, password }: UserCredential) => {
  try {
    const result = await axios.post<string>(`${config.backendUrl}/auth`, {
      email,
      password
    })
    window.localStorage.setItem('token', result.data)
    console.log(result.data)

    const authentication = await axios.get<User>(`${config.backendUrl}/users/profile`, {
      headers: {
        Authorization: `Bearer ${result.data}`
      }
    })
    return authentication.data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logOutUser: state => {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('token')
      delete state.currentUser
      return state
    },
    restoreUser: state => {
      const localStorageUserItem = window.localStorage.getItem('user')
      if (localStorageUserItem) {
        state.currentUser = JSON.parse(localStorageUserItem)
      }
    }
  },
  extraReducers: build => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.error = ''
          state.users = action.payload
        }
      })
      .addCase(fetchAllUsers.pending, (state, action) => {
        state.loading = true
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.error = 'Cannot fetch data'
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          window.localStorage.setItem('user', JSON.stringify(action.payload))
          state.error = ''
          state.currentUser = action.payload
        }
        state.loading = false
      })
      .addCase(newUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.error = ''
          state.users.push(action.payload)
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.users = state.users.filter(user => user.id !== action.payload)
        }
      })
  }
})

const userReducer = usersSlice.reducer
export const { logOutUser, restoreUser } = usersSlice.actions
export default userReducer
