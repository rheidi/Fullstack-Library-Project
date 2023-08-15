import React from 'react'
import useAppSelector from '../hooks/useAppSelector'

const Profile = () => {
  const userState = useAppSelector(state => state.userReducer)
  const { currentUser } = userState

  return (
    <div>
      <h1>{currentUser?.username}</h1>
      <p>Name: {currentUser?.firstname + ' ' + currentUser?.lastname}</p>
      <p>Email: {currentUser?.email}</p>
    </div>
  )
}

export default Profile