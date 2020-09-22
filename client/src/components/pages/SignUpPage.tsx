import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { setAccessToken, signUp } from '../../utils'
import { AuthContext, Errors } from '..'

const SignUpPage: React.FC = () => {
  const history = useHistory()
  const { useCurrentUser } = useContext(AuthContext)!
  const [, setCurrentUser] = useCurrentUser
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const onSubmit = async (e: any) => {
    e.preventDefault()

    const data = await signUp(email, password)

    if (data.accessToken) {
      const { allowPasswordChange, uid } = data.user!
      setCurrentUser({uid, allowPasswordChange })

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

export default SignUpPage