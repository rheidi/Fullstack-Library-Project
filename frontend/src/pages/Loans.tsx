import { useEffect } from "react"
import useAppSelector from "../hooks/useAppSelector"
import { isAdmin } from "../utils/userUtils"
import useAppDispatch from "../hooks/useAppDispatch"
import { fetchAllLoans, fetchUserLoans, returnLoan } from "../redux/reducers/loanReducer"
import { formatAuthorShortname } from "../utils/authorUtils"
import { Link } from "react-router-dom"

const Loans = () => {
  const { loans } = useAppSelector(state => state.loanReducer)
  const { currentUser } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()
  const admin = currentUser && isAdmin(currentUser)

  useEffect(() => {
    if (currentUser) {
      if (admin) {
        dispatch(fetchAllLoans())
      } else {
        dispatch(fetchUserLoans(currentUser))
      }
    }
  }, [currentUser, admin, dispatch])

  if (!loans || loans.length < 1) {
    return <main>
      <h1>No loans for {currentUser?.firstName}</h1>
    </main>
  }

  return <main>
    <h1>Loans</h1>
    <table>
      <thead>
        <tr>
          <td>Book</td>
          <td>Borrower</td>
          <td>Status</td>
          {admin && <td>Controls</td>}
        </tr>
      </thead>
      <tbody>
      {loans.map(loan => {
        const { id, book, user } = loan
        const status = loan.isReturned ? 'returned' : 'borrowed'
        return <tr key={id}>
          <td>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
            {book.author ?
              <Link to={`/author/${book.author.id}`}> - {formatAuthorShortname(book.author)}</Link> :
              ''
            } ({book.year})</td>
          <td>{`${user.firstName} ${user.lastName}`}</td>
          <td className={status}>{status}</td>
          {admin && <td>
            <button onClick={_ => dispatch(returnLoan(loan))}>Set returned</button>
          </td>}
        </tr>
      })}
      </tbody>
    </table>
  </main>
}

export default Loans
