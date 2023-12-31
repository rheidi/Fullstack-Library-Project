import { Link, useNavigate } from 'react-router-dom'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { logOutUser } from '../redux/reducers/userReducer'
import { isAdmin } from '../utils/userUtils'

const Navigation = () => {
  const currentUser = useAppSelector(state => state.userReducer.currentUser)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logout = () => {
    dispatch(logOutUser())
  }

  const admin = isAdmin(currentUser)

  return (
    <nav>
      <Link to="/">📖</Link>
      <Link to="/books">All books</Link>
      <Link to="/authors">All Authors</Link>
      {admin && <Link to="/users">All users</Link>}
      <div className="end">
      {currentUser ? (
        <>
          { admin && (
            <>
              <Link to="/add_book">Add book</Link>
              <Link to="/add_author">Add author</Link>
            </>
          )
          }
          <Link to="/loans">
            Loans
          </Link>
          <Link to="/cart">
            Cart
          </Link>
          <Link to="/profile">
            Profile
          </Link>
          <button onClick={_ => logout()}>Logout</button>
        </>
      ) : (
        <Link to="/login">
          Login
        </Link>
      )}
      </div>
    </nav>
  )
}

export default Navigation
