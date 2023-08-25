import { Author } from '../../types/Author'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import config from '../../config'

interface AuthorReducer {
  authors: Author[]
  currentAuthor?: Author
  loading: boolean
  error: string
}

const initialState: AuthorReducer = {
  authors: [],
  loading: false,
  error: ''
}

export const fetchAllAuthors = createAsyncThunk('fetchAllAuthors', async () => {
  try {
    const result = await axios.get<Author[]>(`${config.backendUrl}/authors`)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

export const fetchOneAuthor = createAsyncThunk('fetchOneBook', async (id: string | undefined) => {
  try {
    const result = await axios.get<Author>(`${config.backendUrl}/authors/${id}`)
    return result.data
  } catch (e) {
    return e as AxiosError
  }
})

const authorSlice = createSlice({
  name: 'authorSlice',
  initialState,
  reducers: {},
  extraReducers: build => {
    build
      .addCase(fetchAllAuthors.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.authors = action.payload
        }
      })
      .addCase(fetchOneAuthor.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.currentAuthor = action.payload
        }
      })
  }
})

export default authorSlice.reducer
