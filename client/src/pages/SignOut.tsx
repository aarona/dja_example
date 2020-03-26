import React, { useContext } from 'react'
import { Redirect } from 'react-router';
import { AuthContext } from '../components/AuthProvider';
import { getAccessToken, setAccessToken } from '../utils/accessToken';

interface SignOutProps {

}

export const SignOut: React.FC<SignOutProps> = () => {
  const { setCurrentUser, signOut, client } = useContext(AuthContext)

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