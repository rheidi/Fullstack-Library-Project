import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { useEffect } from 'react'
import { fetchAllBooks } from '../redux/reducers/bookReducer'

const Books = () => {
  const { books } = useAppSelector(state => state.bookReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllBooks())
  }, [dispatch])

  return (
    <main className="book-grid">
      {books.map(b => (
        <div className="card">
          <h2>{b.title}</h2>
          <h3>{b.authors.map(a => `${a.firstname} ${a.lastname}`).join(',')}</h3>
          <p>{b.description}</p>
        </div>
      ))}
    </main>
  )
}

export default Books
