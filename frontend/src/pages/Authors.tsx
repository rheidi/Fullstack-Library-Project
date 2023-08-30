import { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { formatAuthorName } from "../utils/authorUtils"
import { fetchAllAuthors } from "../redux/reducers/authorReducer"

const Authors = () => {
  const { authors } = useAppSelector(state => state.authorReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchAllAuthors())
  }, [dispatch])
  

  return <main>
    <h1>List of authors</h1>
    <ul>
      { authors.map(author => {
          return <li key={author.id}>{formatAuthorName(author)}</li>
        })
      }
    </ul>
  </main>
}

export default Authors
