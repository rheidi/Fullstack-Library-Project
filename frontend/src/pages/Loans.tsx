import { useEffect } from "react"
import useAppSelector from "../hooks/useAppSelector"
import { isAdmin } from "../utils/userUtils"
import useAppDispatch from "../hooks/useAppDispatch"
import { fetchAllLoans, fetchUserLoans } from "../redux/reducers/loanReducer"

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

  return <main>
    <ul>
      {loans.map(loan => {
        const { book, user } = loan
        return <li>
          
        </li>
      })}
    </ul>
  </main>
}

export default Loans
