import { Link } from 'react-router-dom'
// import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'

const Navigation = () => {
  // const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.userReducer.currentUser)

  return (
    <nav>
      <Link to="/">📖</Link>
      <Link to="/books">All books</Link>
      <Link to="/authors">All Authors</Link>
      {currentUser ? (
        <>
          { currentUser.role === "Admin" && (
            <>
              <Link to="/add_book">Add book</Link>
            </>
          )
          }
          <Link className="end" to="/loans">
            Loans
          </Link>
          <Link className="end" to="/cart">
            Cart
          </Link>
          <Link className="end" to="/profile">
            Profile
          </Link>
        </>
      ) : (
        <Link className="end" to="/login">
          Login
        </Link>
      )}
    </nav>
  )
}

export default Navigation
