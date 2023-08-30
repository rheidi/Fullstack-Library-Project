import { useEffect } from "react"
import useAppDispatch from "../hooks/useAppDispatch"
import useAppSelector from "../hooks/useAppSelector"
import { deleteUser, fetchAllUsers } from "../redux/reducers/userReducer"
import { isAdmin } from "../utils/userUtils"

const Users = () => {
  const { users, currentUser } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // Somehow even if dependencies is set this will infinite loop and I don't understand why
    if (users.length < 1) {
      dispatch(fetchAllUsers())
    }
  }, [dispatch])

  return <main>
    <h1>List of all users</h1>
    <ul>
      { 
        users.map(user => {
          return <li key={user.id}>
            {`${user.firstName} ${user.lastName} (${user.email})`}&nbsp;{ isAdmin(currentUser) && !isAdmin(user) && <button onClick={_ => dispatch(deleteUser(user.id))}>Delete user</button>}
          </li>
        })
      }
    </ul>
  </main>
}

export default Users
