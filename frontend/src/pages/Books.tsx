import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { FormEvent, useEffect, useState } from 'react'
import { fetchAllBooks } from '../redux/reducers/bookReducer'
import '../styles/books.scss'
import { Link } from 'react-router-dom'
import { addToCart } from '../redux/reducers/cartReducer'
import { formatAuthorName } from '../utils/authorUtils'

const Books = () => {
  const { books } = useAppSelector(state => state.bookReducer)
  const dispatch = useAppDispatch()
  const userState = useAppSelector(state => state.userReducer)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [search, setSearch] = useState('')

  const { currentUser } = userState
  
  useEffect(() => {
    const queryParams = { pageNumber, pageSize, search }
    dispatch(fetchAllBooks(queryParams))
  }, [dispatch, pageNumber, pageSize, search])

  const updateSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const queryParams = { pageNumber, pageSize, search }
    dispatch(fetchAllBooks(queryParams))
  }

  const increasePageNumber = () => {
    if (books.length < pageSize) return
    setPageNumber(pageNumber + 1)
  }

  const decreasePageNumber = () => {
    if (pageNumber <= 1) return
    setPageNumber(pageNumber - 1)
  }

  return (
    <main className="book-grid">
      <div id="book-tools" className="tools">
        <label htmlFor='page-size'>Books per page</label>
        <select id="page-size" onChange={e => setPageSize(parseInt(e.target.value))}>
          <option value="9">10</option>
          <option value="27">25</option>
          <option value="54">50</option>
        </select>
        <form id="searchform" onSubmit={e => {updateSearch(e)}} >
          <input name="search-term" id="search" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>
      {books.map(b => (
        <div key={b.id} className="card">
          <Link to={`/book/${b.id}`}>
            <h2>{b.title}</h2>
            <p>{b.genre}</p>
            <h3><Link to={`/author/${b.author.id}`}>{`${formatAuthorName(b.author)}`}</Link></h3>
          </Link>
          {currentUser && (
            <div className="tools">
              <button onClick={_ => dispatch(addToCart(b))}>Add to cart</button>
              {currentUser.role === 'Admin' && <Link to={`/edit_book/${b.id}`}>Edit book</Link>}
            </div>
          )}
          <div className='more-info'><Link to={`/book/${b.id}`}><span>More info &gt;</span></Link></div>
        </div>
      ))}
      <div id="pagination" className="tools">
        <button className="prev" disabled={(pageNumber <= 1)} onClick={_ => decreasePageNumber()}>Previous</button>
        <button className="next" disabled={(books.length < pageSize)} onClick={_ => increasePageNumber()}>Next</button>
        </div>
    </main>
  )
}

export default Books
