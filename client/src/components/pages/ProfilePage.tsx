import React, { useContext, useState } from 'react'
import { AuthContext, Messages } from '..'
import { changePasswordWithCurrentPassword, getAccessToken, requestPasswordReset, setAccessToken } from '../../utils/djaAuthentication'
import { developerNote, mono } from '../layouts/styles'

const ProfilePage: React.FC = () => {
  const { useCurrentUser } = useContext(AuthContext)!
  const [currentUser] = useCurrentUser
  const [messages, setMessages] = useState<string[]>([])
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const clearPasswordFields = () => {
    setOldPassword('')
    setPassword('')
    setPasswordConfirmation('')
  }

  const handleResetPasswordRequest = async (e:any) => {
    e.preventDefault()

    if(currentUser) {
      const response = await requestPasswordReset(currentUser.uid)

      if(response.success) {
        setMessages([response.message])
      } else if(response?.errors?.fullMessages) {
        setMessages(response.errors.fullMessages)
      } else {
        setMessages(['Something went wrong!'])
      }
    }
  }

  const changePassword = async (e:any) => {
    e.preventDefault()

    if(currentUser) {
      const accessToken = getAccessToken()
      const response = await changePasswordWithCurrentPassword(oldPassword, password, passwordConfirmation, accessToken)
      console.log("resp: ", response);
      
      if(response.success) {
        clearPasswordFields()
        setMessages([response.message])
        setAccessToken(response.accessToken)
      } else if (response?.errors?.fullMessages) {
        setMessages(response.errors.fullMessages)
      } else {
        setMessages(['Something went wrong!'])
      }
    }
  }

  return <div>
    <Messages messages={messages} />
    <h1>My Profile</h1>
    <h3>User details:</h3>
    <div><strong>Email:</strong> {currentUser?.uid}</div>
    <h2>Change the user's password:</h2>
    <div>
      <h3>Option 1: Request password change via email message:</h3>
      <div style={developerNote}>
        For this option to work, you need the following config settings set in your&nbsp;
        <span style={mono}>/config/initializers/devise_jwt_auth.rb</span> config file:
        <ul>
          <li><span style={mono}>config.require_client_password_reset_token = true</span></li>
        </ul>
      </div>
      <button onClick={handleResetPasswordRequest}>Submit Request</button>
    </div>
    <div>
      <h3>Option 2: Change your password by using your current password:</h3>
      <div style={developerNote}>
        For this option to work, you need the following config settings set in your&nbsp;
        <span style={mono}>/config/initializers/devise_jwt_auth.rb</span> config file:
        <ul>
          <li><span style={mono}>config.require_client_password_reset_token = false</span></li>
          <li><span style={mono}>config.check_current_password_before_update = :password # :attributes also works here</span></li>
        </ul>
      </div>
      <form onSubmit={changePassword} >
        <div>
          <input value={oldPassword} placeholder="Current Password" type="password" onChange={e => {
            setOldPassword(e.target.value)
          }} />
        </div>
        <div>
          <input value={password} placeholder="New Password" type="password" onChange={e => {
            setPassword(e.target.value)
          }} />
        </div>
        <div>
          <input value={passwordConfirmation} placeholder="Confirm New Password" type="password" onChange={e => {
            setPasswordConfirmation(e.target.value)
          }} />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  </div>
}

export default ProfilePage