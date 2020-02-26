import React, { useState, useContext } from 'react'
import { RouteComponentProps } from 'react-router'
import { setAccessToken } from '../utils/accessToken'
import { signIn } from '../utils/authentication'
import { StoreContext } from '../components/StoreContext'
import { MeDocument, MeQuery } from '../generated/graphql'
import { Errors } from '../components/Errors'

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const { useClient } = useContext(StoreContext)!
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [client] = useClient
  const [errors, setErrors] = useState<string[]>([])

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const data = await signIn(email, password)

    if(data && data['access-token'])
    {
      client.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: data.user
        }
      })

      setAccessToken(data['access-token'])
      history.push('/')

    } else {
      setErrors(data.errors)
    }
  }

  return <div>
    <h1>Login Page</h1>
    <form onSubmit={onSubmit} >
      <Errors errors={errors} />
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