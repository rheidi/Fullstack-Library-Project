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
      {currentUser ? (
        <>
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
