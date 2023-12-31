import { useEffect } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import useAppSelector from './hooks/useAppSelector'
import useAppDispatch from './hooks/useAppDispatch'
import Layout from './components/Layout'
import AddOrEditAuthor from './pages/AddOrEditAuthor'
import AddOrEditBook from './pages/AddOrEditBook'
import Authors from './pages/Authors'
import Book from './pages/Book'
import Books from './pages/Books'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { restoreUser } from './redux/reducers/userReducer'
import './styles/style.scss'
import Loans from './pages/Loans'
import Profile from './pages/Profile'
import Users from './pages/Users'
import Author from './pages/Author'

const App = () => {
  const dispatch = useAppDispatch()

  const userState = useAppSelector(state => state.userReducer)
  const { currentUser } = userState

  useEffect(() => {
    if(!currentUser) {
      dispatch(restoreUser())
    }
  }, [dispatch, currentUser])

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
          <Route path="authors" element={<Authors />} />
          <Route path="author/:id" element={<Author />} />
          <Route element={<LoggedInRoutes isAllowed={!currentUser} />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route element={<PrivateRoutes isAllowed={!!currentUser} />}>
            <Route path="loans" element={<Loans />} />
            <Route path="cart" element={<Cart />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route
            element={<PrivateRoutes isAllowed={!!currentUser && currentUser.role === 'Admin'} />}
          >
            <Route path="add_book" element={<AddOrEditBook />} />
            <Route path="edit_book/:id" element={<AddOrEditBook />} />
            <Route path="add_author" element={<AddOrEditAuthor />} />
            <Route path="edit_author/:id" element={<AddOrEditAuthor />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
