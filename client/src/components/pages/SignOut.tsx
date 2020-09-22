import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { AuthContext } from '..';
import { getAccessToken, setAccessToken } from '../../utils';
import { signOut } from '../../utils';

const SignOutPage: React.FC = () => {
  const { useCurrentUser } = useContext(AuthContext)!
  const [, setCurrentUser] = useCurrentUser

  try {
    signOut(getAccessToken())
    setAccessToken('')
  }
  catch {
    console.error("Error in SignOut.");
  }

  setCurrentUser(null)
  return <Redirect to="/sign-in"/>
}

export default SignOutPage