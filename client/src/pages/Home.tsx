import React, { useContext } from 'react'
import { AuthContext } from '../components/AuthProvider'

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  const { currentUser } = useContext(AuthContext)
  
  let loggedIn = currentUser !== null
  let body = ""

  if (loggedIn) {
    body = `Hello, ${currentUser?.uid}`
  }

  return <div>
    <h1>Home Page</h1>
    <div>{ body }</div>
  </div>
}