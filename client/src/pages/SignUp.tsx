import React, { useState, useContext } from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import { setAccessToken } from '../utils/accessToken'
import { MeDocument, MeQuery } from '../generated/graphql'
import { signUp } from '../utils/authentication'
import { AuthContext } from '../components/AuthProvider'
import { Errors } from '../components/Errors'

export const SignUp: React.FC<RouteComponentProps> = ({ history }) => {
  const { currentUser, setCurrentUser, client } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  let loggedIn = currentUser !== null

  if (loggedIn) {
    return <Redirect to="/" />
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const data = await signUp(email, password)

    if (data.accessToken) {
      const { allowPasswordChange, uid, email, provider } = data.user!
      setCurrentUser!({ uid })

      client.writeQuery<MeQuery>({
        query: MeDocument,
        data: {
          me: {
            allowPasswordChange,
            uid,
            email,
            provider,
            __typename: 'User'
          }
        }
      })

      setAccessToken(data.accessToken)
      history.push('/')

    } else {
      setErrors(data.errors.full_messages)
    }
  }

  return <div>
    <h1>Register</h1>
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
      <button type="submit">Sign Up</button>
    </form>
  </div>
}