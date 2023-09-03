import { Link, useParams } from "react-router-dom"
import useAppSelector from "../hooks/useAppSelector"
import { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import { fetchOneAuthor } from "../redux/reducers/authorReducer"
import { formatAuthorShortname } from "../utils/authorUtils"

const Author = () => {
  const id = useParams().id
  const { currentAuthor } = useAppSelector(state => state.authorReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (id && currentAuthor?.id !== id) {
      dispatch(fetchOneAuthor(id))
    } 
  })

  if (!currentAuthor) {
    return (
      <main className="error">
        <h1>No such author</h1>
      </main>
    )
  }

  const { books, yearOfBirth } = currentAuthor

  return (
    <main>
      <h1>{formatAuthorShortname(currentAuthor)}</h1>
      {yearOfBirth && <span className="yob">Born {yearOfBirth}</span>}
      <ul>
        {books.map(b => {
          return (
          <li key={b.id}>
            <Link to={`/books/${b.id}`}>`${b.title} (${b.year}), ${b.genre})`</Link>
          </li>
          )}
        )}
      </ul>
    </main>
  )
}

export default Author
