import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Books from './pages/Books'
import './styles/style.scss'
import Login from './pages/Login'
import Book from './pages/Book'
import useAppSelector from './hooks/useAppSelector'
import AddOrEditBook from './pages/AddOrEditBook'

const App = () => {
  const userState = useAppSelector(state => state.userReducer)
  const { currentUser } = userState
  const PrivateRoutes = ({ isAllowed }: { isAllowed: boolean }) => {
    return isAllowed ? <Outlet /> : <Navigate to="login" />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={<PrivateRoutes isAllowed={!!currentUser && currentUser.role === 'admin'} />}
          >
            <Route path="add_book" element={<AddOrEditBook />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
