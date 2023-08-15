import { useEffect } from 'react'
import { useParams } from 'react-router'

import useAppDispatch from '../hooks/useAppDispatch'
import useAppSelector from '../hooks/useAppSelector'
import { fetchOneBook } from '../redux/reducers/bookReducer'
import { addToCart } from '../redux/reducers/cartReducer'

const Book = () => {
  const id = useParams().id
  const { book } = useAppSelector(state => state.bookReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchOneBook(id))
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
      <p className="author">{book.authors.map(a => `${a.firstname} ${a.lastname}`).join(', ')}</p>
      <p className="meta">
        <span className="genre">{book.genre}</span> <span className="year">{book.year}</span>
      </p>
      {book.description.split('\n').map(paragraph => (
        <p>{paragraph}</p>
      ))}
      <button onClick={() => dispatch(addToCart(book))}>Add to Cart</button>
    </main>
  )
}

export default Book
