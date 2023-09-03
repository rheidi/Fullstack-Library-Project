import React, { useState } from 'react'

import useAppDispatch from '../hooks/useAppDispatch'
import { newUser } from '../redux/reducers/userReducer'
import { Link, useNavigate } from 'react-router-dom'
import useAppSelector from '../hooks/useAppSelector'
import { AxiosError } from 'axios'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  const { error } = useAppSelector(state => state.userReducer)
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(newUser({ firstname, lastname, email, password })).then(action => {
      if (!(action.payload instanceof AxiosError)) {
        setSuccess(true)
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setTimeout(() => navigate('/login'), 1500)
      }
    })
  }

  return (
    <main>
      {error && error !== '' && <p className="error">{error}</p>}
      {success && (
        <p className="success">
          Registration completed, redirecting to <Link to="/login">login page</Link>
        </p>
      )}
      <h1>Register new user</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <legend>Registration info:</legend>
          <label htmlFor="firstname" id="firstname">
            first name:
          </label>
          <input onChange={e => setFirstName(e.target.value)} name="firstname" value={firstname} />
          <label htmlFor="lastname" id="lastname">
            last name:
          </label>
          <input onChange={e => setLastName(e.target.value)} name="lastname" value={lastname} />
          <label htmlFor="email" id="email">
            email:
          </label>
          <input onChange={e => setEmail(e.target.value)} type="email" name="email" value={email} />
          <label htmlFor="password" id="password">
            password:
          </label>
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            name="password"
            value={password}
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  )
}

export default SignUp
