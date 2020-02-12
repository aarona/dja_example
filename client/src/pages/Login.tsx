import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
// import { setAccessToken } from '../utils/accessToken'

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: any) => {
    e.preventDefault()

    console.log("Form Submitted");
    
    history.push('/')
  }

  return <div>
    <h1>Login Page</h1>
    <form onSubmit={onSubmit} >
      <div>
        <input value={email} placeholder="Email" onChange={e => {
          setEmail(e.target.value)
        }} />
      </div>
      <div>
        <input value={password} placeholder="Password" type="password" onChange={e => {
          setPassword(e.target.value)
        }} />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
}