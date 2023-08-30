import React from 'react'
import useAppSelector from '../hooks/useAppSelector'

const Profile = () => {
  const userState = useAppSelector(state => state.userReducer)
  const { currentUser } = userState

  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {currentUser?.firstName + ' ' + currentUser?.lastName}</p>
      <p>Email: {currentUser?.email}</p>
    </div>
  )
}

export default Profile
