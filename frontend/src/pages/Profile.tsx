import React from 'react'
import useAppSelector from '../hooks/useAppSelector'
import useAppDispatch from '../hooks/useAppDispatch'
import { deleteUser } from '../redux/reducers/userReducer'
import { isAdmin } from '../utils/userUtils'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const { currentUser } = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  if(!currentUser) {
    navigate('/')
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {currentUser?.firstName + ' ' + currentUser?.lastName}</p>
      <p>Email: {currentUser?.email}</p>
      {currentUser && !isAdmin(currentUser) && <button onClick={_ => dispatch(deleteUser(currentUser.id))}>Delete profile</button>}
    </div>
  )
}

export default Profile
