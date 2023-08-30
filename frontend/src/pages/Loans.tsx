import { useEffect } from "react"
import useAppSelector from "../hooks/useAppSelector"
import { isAdmin } from "../utils/userUtils"
import useAppDispatch from "../hooks/useAppDispatch"
import loanReducer, { fetchAllLoans, fetchUserLoans } from "../redux/reducers/loanReducer"

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
  }, [currentUser])

  const returnBook = (id: string) => console.log('return book with id ' + id)

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
        const { book, user } = loan
        const status = loan.isReturned ? 'returned' : 'borrowed'
        return <tr key={loan.id}>
          <td>{`${book.title} - ${book.authorName} (${book.year})`}</td>
          <td>{`${user.firstName} ${user.lastName}`}</td>
          <td className={status}>{status}</td>
          {admin && <td><button onClick={_ => returnBook(loan.id)}>Set returned</button></td>}
        </tr>
      })}
      </tbody>
    </table>
  </main>
}

export default Loans
