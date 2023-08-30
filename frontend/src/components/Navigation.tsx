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
      <div className="end">
      {currentUser ? (
        <>
          { currentUser.role === "Admin" && (
            <>
              <Link to="/add_book">Add book</Link>
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
