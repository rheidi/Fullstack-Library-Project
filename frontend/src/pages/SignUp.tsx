import React, { useState } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import { newUser } from '../redux/reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(newUser({ firstname, lastname, username, email, password }))
    navigate('/login')
  }
  return (
    <div>
      <h1>Register new user</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <legend>Registration info:</legend>
          <label id="firstname">
            first name:
            <input onChange={e => setFirstName(e.target.value)} name="name" value={firstname} />
          </label>
          <br />
          <label id="lastname">
            last name:
            <input onChange={e => setLastName(e.target.value)} name="name" value={lastname} />
          </label>
          <br />
          <label id="username">
            username:
            <input onChange={e => setUserName(e.target.value)} name="name" value={username} />
          </label>
          <br />
          <label id="email">
            email:
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              name="email"
              value={email}
            />
          </label>
          <br />
          <label id="password">
            password:
            <input
              onChange={e => setPassword(e.target.value)}
              type="password"
              name="password"
              value={password}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  )
}

export default SignUp
