import { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { formatAuthorName } from "../utils/authorUtils"
import { fetchAllAuthors } from "../redux/reducers/authorReducer"
import { isAdmin } from "../utils/userUtils"
import { Link } from "react-router-dom"

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
          return <li key={author.id}>{formatAuthorName(author)} {isAdmin(currentUser) && <Link to={`/edit_author/${author.id}`}>Edit</Link>}</li>
        })
      }
    </ul>
  </main>
}

export default Authors
