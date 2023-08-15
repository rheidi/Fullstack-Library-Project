import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'

import useAppDispatch from '../hooks/useAppDispatch'
import { login } from '../redux/reducers/userReducer'
import useAppSelector from '../hooks/useAppSelector'

const Login = () => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { error } = useAppSelector(state => state.userReducer)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(login({ email, password })).then(action => {
      if (!(action.payload instanceof AxiosError)) {
        navigate('/')
      }
    })
  }
  return (
    <div>
      <h1>Login</h1>
      {error && error !== '' && <p className="error">{error}</p>}
      <form onSubmit={e => handleSubmit(e)}>
        <fieldset>
          <legend>Log in:</legend>
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
      <br />
      <h2>Register</h2>
      <p>If you don't have an account, you can register here:</p>
      <Link to="/signup">Sign up here</Link>
    </div>
  )
}

export default Login
