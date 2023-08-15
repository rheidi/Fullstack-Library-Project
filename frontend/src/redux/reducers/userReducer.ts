import { User } from '../../types/User'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import config from '../../config'
import axios, { AxiosError } from 'axios'
import { NewUser } from '../../types/NewUser'
import { UserCredential } from '../../types/UserCredential'

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
    const result = await axios.get<User[]>(`${config.backendUrl}/users`)
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

export const login = createAsyncThunk('login', async ({ email, password }: UserCredential) => {
  try {
    const result = await axios.post<{ access_token: string }>(`${config.backendUrl}/login`, {
      email,
      password
    })

    const authentication = await axios.get<User>(`${config.backendUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${result.data.access_token}`
      }
    })
    window.localStorage.setItem('user', JSON.stringify(authentication.data))
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
      return initialState
    }
  },
  extraReducers: build => {
    build
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.error = ''
          state.users = action.payload
        }
        state.loading = false
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
  }
})

const userReducer = usersSlice.reducer
export const { logOutUser } = usersSlice.actions
export default userReducer
