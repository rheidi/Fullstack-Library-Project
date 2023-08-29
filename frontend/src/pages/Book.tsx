import { useEffect } from 'react'
import { useParams } from 'react-router'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchOneBook } from '../redux/reducers/bookReducer'
import { addToCart } from '../redux/reducers/cartReducer'
import { Genre } from '../types/Genre'
import '../styles/book.scss'
import { Link } from 'react-router-dom'

const Book = () => {
  const id = useParams().id
  const { book } = useAppSelector(state => state.bookReducer)
  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.userReducer)
  const { currentUser } = userState

  useEffect(() => {
    if (!book || book.id !== id) {
      dispatch(fetchOneBook(id))
    }
  }, [dispatch, id])


  if (!book) {
    return (
      <main>
        <h1>No such book exists</h1>
      </main>
    )
  }

  return (
    <main className="book">
      {book.image ? <img src={book.image} alt={`Cover of ${book.title}`} /> : null}
      <h1>{book.title}</h1>
      <p className="author">
        {book.authorName}
      </p>
      <p className="meta">
        <span className="genre">{book.genre}</span> <span className="year">{book.year}</span>
      </p>
      {book.description.split('\n').map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
      {currentUser && (
        <div className="tools">
          <button onClick={e => dispatch(addToCart(book))}>Add to cart</button>
          {currentUser.role === 'Admin' && <Link to={`/edit_book/${book.id}`}>Edit book</Link>}
        </div>
      )}
    </main>
  )
}

export default Book
