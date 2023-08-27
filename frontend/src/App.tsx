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
import SignUp from './pages/SignUp'
import Cart from './pages/Cart'
import AddOrEditAuthor from './pages/AddOrEditAuthor'

const App = () => {
  const userState = useAppSelector(state => state.userReducer)
  const { currentUser } = userState
  const PrivateRoutes = ({ isAllowed }: { isAllowed: boolean }) => {
    return isAllowed ? <Outlet /> : <Navigate to="login" />
  }

  const LoggedInRoutes = ({ isAllowed }: { isAllowed: boolean }) => {
    return isAllowed ? <Outlet /> : <Navigate to="profile" />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="book/:id" element={<Book />} />
          <Route element={<LoggedInRoutes isAllowed={!currentUser} />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoutes isAllowed={!!currentUser} />}>
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route
            element={<PrivateRoutes isAllowed={!!currentUser && currentUser.role === 'admin'} />}
          >
            <Route path="add_book" element={<AddOrEditBook />} />
            <Route path="edit_book/:id" element={<AddOrEditBook />} />
            <Route path="add_author" element={<AddOrEditAuthor />} />
            <Route path="edit_author/:id" element={<AddOrEditAuthor />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
