import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { AuthContext, Errors } from '..'
import { signIn, setAccessToken } from '../../utils'

const SignInPage: React.FC = () => {
  const { useCurrentUser } = useContext(AuthContext)!
  const [, setCurrentUser] = useCurrentUser
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const history = useHistory()

  const onSubmit = async (e:any) => {
    e.preventDefault()

    const data = await signIn(email, password)

    if(data.accessToken)
    {
      const { allowPasswordChange, uid } = data.user!

      setCurrentUser({allowPasswordChange, uid })
      setAccessToken(data.accessToken)

      history.push({
        pathname: '/profile',
        state: {
          message: 'Sign in successful!'
        }
      })

    } else {      
      if(data.errors?.fullMessages) {
        setErrors(data.errors.fullMessages)
      } else {
        setErrors(['Something went wrong.'])
      }
    }
  }

  return <div>
    <h1>Sign In</h1>
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
      <button type="submit">Sign In</button> Forgot your password? <Link to="/forgot-password">Click here</Link>.
    </form>
    <div>
      Because you're not signed in, you can test that you're not able to see the <a href="/profile">Profile Page</a>.
    </div>
  </div>
}

export default SignInPage