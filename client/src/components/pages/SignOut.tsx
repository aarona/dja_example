import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { AuthContext } from '..';
import { getAccessToken, setAccessToken } from '../../utils';
import { signOut } from '../../utils';

const SignOutPage: React.FC = () => {
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

export default SignOutPage