import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { setAccessToken, getAccessToken } from '../utils/accessToken'
import { signIn } from '../utils/authentication'

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: any) => {
    e.preventDefault()

    console.log("SIGNING IN...")
    try {
      const data = await signIn(email, password)
      console.log("FETCHED DATA...", data)
      setAccessToken(data['access-token'])
      console.log("ACCESS TOKEN: ", getAccessToken());
      
      //const currentUser: IUser = {
      //  allow_password_change: data.allow_password_change,
      //  email: data.email,
      //  id: data.id,
      //  name: data.name,
      //  provider: data.provider,
      //  uid: data.uid
      //}

      //setCurrentUser(currentUser)
      console.log("SIGNED IN...");
    } catch (error) {
      console.error('ERROR: ', error)
      //setCurrentUser(null)
    }

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