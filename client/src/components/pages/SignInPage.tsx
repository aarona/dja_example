import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router'
import { AuthContext, Errors } from '..'
import { MeDocument, MeQuery } from '../../generated/graphql'
import { signIn, setAccessToken } from '../../utils'

const SignInPage: React.FC = () => {
  const { client, setCurrentUser } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const history = useHistory()

  const onSubmit = async (e:any) => {
    e.preventDefault()

    const data = await signIn(email, password)

    if(data.accessToken)
    {
      const { allowPasswordChange, uid, email, provider } = data.user!
      
      console.log("setCurrentUser: ", { uid });
      setCurrentUser!({allowPasswordChange, email, provider, uid})

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

      // console.log("setAccessToken");
      setAccessToken(data.accessToken)
      history.push('/profile')

    } else {
      setErrors(data.errors)
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
      <button type="submit">Sign In</button>
    </form>
    <div>
      Because you're not signed in, you can test that you're not able to see the <a href="/profile">Profile Page</a>.
    </div>
  </div>
}

export default SignInPage