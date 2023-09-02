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
  }, [dispatch])

  const updateSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchField = document.getElementById('search') as HTMLInputElement
    const searchTerm = searchField.value
    console.log(searchTerm)
    if (searchTerm && searchTerm !== '' && search !== searchTerm) {
      setSearch(searchTerm)
    }    
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
        <form id="searchform" onSubmit={e => {updateSearch(e)}}>
          <input name="search-term" id="search" placeholder="search" />
          <button type="submit">Search</button>
        </form>
      </div>
      {books.map(b => (
        <div key={b.id} className="card">
          <Link to={`/book/${b.id}`}>
            <h2>{b.title}</h2>
            <p>{b.genre}</p>
            <h3>{`${formatAuthorName(b.author)}`}</h3>
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
        <button className="prev" disabled={(pageNumber <= 1)}>Previous</button>
        <button className="next" disabled={(books.length < pageSize)}>Next</button>
        </div>
    </main>
  )
}

export default Books
