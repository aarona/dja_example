import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { AuthContext } from '../components';
import { getAccessToken, setAccessToken } from '../utils';
import { signOut } from '../utils';

interface SignOutProps {

}

export const SignOut: React.FC<SignOutProps> = () => {
  const { setCurrentUser, client } = useContext(AuthContext)

  try {
    client.resetStore()
    signOut(getAccessToken())
    setAccessToken('')
  }
  catch {
    console.error("Error in SignOut.");
  }

  setCurrentUser!(null)
  return <Redirect to="/sign-in"/>
}

export default SignOut