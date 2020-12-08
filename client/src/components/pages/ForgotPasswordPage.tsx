import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Messages } from '..'
import { requestPasswordReset } from '../../utils/djaAuthentication'

const ForgotPasswordPage: React.FC = () => {
  const history = useHistory()
  const [messages, setMessages] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const handleResetPasswordRequest = async (e: any) => {
    e.preventDefault()
      const response = await requestPasswordReset(email)

      if (response.success) {
        history.push({
          pathname: '/sign-in',
          state: {
            message: response.message
          }
        })
      } else {
        setMessages(response.errors)
      }
  }

  return <div>
    <h1>Forgot My Password</h1>
    <div>Enter your email address to receive an email with directions on how to change your password</div>
    <form onSubmit={handleResetPasswordRequest} >
      <Messages messages={messages} />
      <div>
        <input value={email} placeholder="Email" onChange={e => {
          setEmail(e.target.value)
        }} />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
}

export default ForgotPasswordPage