import { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { formatAuthorName } from "../utils/authorUtils"
import { fetchAllAuthors } from "../redux/reducers/authorReducer"
import { isAdmin } from "../utils/userUtils"
import { Link } from "react-router-dom"
import '../styles/authors.scss'

const Authors = () => {
  const { authors } = useAppSelector(state => state.authorReducer)
  const { currentUser } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllAuthors())
  }, [dispatch])

  return <main>
    <h1>List of authors</h1>
    <ul>
      { authors.map(author => {
          return <li key={author.id}>
            <Link to={`/author/${author.id}`} >
              {formatAuthorName(author)}
            </Link>
            {isAdmin(currentUser) &&
              <Link to={`/edit_author/${author.id}`}><span className="edit">Edit</span></Link>
            }
          </li>
        })
      }
    </ul>
  </main>
}

export default Authors
