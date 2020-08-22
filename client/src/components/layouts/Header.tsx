import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { setAccessToken, getAccessToken, signOut } from '../../utils'
import { AuthContext } from '../contexts'

interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {
  const history = useHistory()
  const { currentUser, setCurrentUser, client } = useContext(AuthContext)

  let body = null
  let loggedIn = currentUser !== null

  const handleLogOut = async (e: any) => {
    e.preventDefault()
    try {
      client.resetStore()
      await signOut(getAccessToken())
      setAccessToken('')
    }
    catch {
      console.error("Error in Header.handleLogOut.");
    }
    setCurrentUser!(null)

    history.push({
      pathname: '/sign-in',
      state: { message: "You've been signed out successfully" }
    })
  }

  return <header>
    <div><Link to="/">Home</Link></div>
    {loggedIn ? "" : <div><Link to="/sign-up">Sign Up</Link></div>}
    {loggedIn ? "" : <div><Link to="/sign-in">Sign In</Link></div>}
    {loggedIn ? <div><Link to="/profile">My Profile</Link></div> : ""}
    {loggedIn ? <div><Link to="/sign-out" onClick={handleLogOut}>Sign out</Link></div> : ""}
    {body}
  </header>
}

export default Header