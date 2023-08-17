import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { useEffect } from 'react'
import { fetchAllBooks } from '../redux/reducers/bookReducer'
import '../styles/books.scss'
import { Link } from 'react-router-dom'
import { addToCart } from '../redux/reducers/cartReducer'
import { Genre } from '../types/Genre'

const Books = () => {
  const { books } = useAppSelector(state => state.bookReducer)
  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.userReducer)

  const { currentUser } = userState

  useEffect(() => {
    dispatch(fetchAllBooks())
  }, [dispatch])

  return (
    <main className="book-grid">
      {books.map(b => (
        <div key={b.id} className="card">
          <Link to={`/book/${b.id}`}>
            <h2>{b.title}</h2>
            <p>{Genre[b.genre]}</p>
            <h3>{`${b.author?.firstname} ${b.author?.lastname}`}</h3>
          </Link>
          {currentUser && (
            <div className="tools">
              <button onClick={e => dispatch(addToCart(b))}>Add to cart</button>
              {currentUser.role === 'admin' && <Link to={`/edit_book/${b.id}`}>Edit book</Link>}
            </div>
          )}
        </div>
      ))}
    </main>
  )
}

export default Books
