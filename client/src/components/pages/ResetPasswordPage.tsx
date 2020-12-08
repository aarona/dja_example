import React, { useContext } from 'react'
import { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { AuthContext, Errors } from '..'
import { changePassword, setAccessToken } from '../../utils/djaAuthentication'
import { useQuery } from '../../utils/useQuery'

interface ResetPasswordPageProps {

}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({}) => {
  const history = useHistory()
  let resetPasswordToken = useQuery().get('reset_password_token')

  const { useCurrentUser } = useContext(AuthContext)!
  const [currentUser, setCurrentUser] = useCurrentUser
  const [errors, setErrors] = useState<string[]>([])
  const [password, setPassword] = useState('')
  const handleResetPassword = async (e:any) => {
    e.preventDefault()
    
    console.log("id: ", resetPasswordToken);

    const response = await changePassword(password, password, resetPasswordToken!)
    
    if(response.success) {
      history.push({
        pathname: '/sign-in',
        state: {
          message: response.message
        }
      })
    } else {
      if (response.errors?.fullMessages) {
        setErrors(response.errors.fullMessages)
      } else {
        setErrors(['Something went wrong.'])
      }
    }
  }

  return <div>
    <h1>Reset My Password:</h1>
    <form onSubmit={handleResetPassword} >
      <Errors errors={errors} />
      <div>
        <input value={password} placeholder="Password" type="password" onChange={e => {
          setPassword(e.target.value)
        }} />
      </div>
      <button type="submit">Change Password</button>
    </form>
  </div>
}

export default ResetPasswordPage
