import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { setAccessToken, getAccessToken, signOut } from '../utils'
// import { useMeQuery } from '../generated/graphql'
import { AuthContext } from '.'

interface HeaderProps {
}

export const Header: React.FC<HeaderProps> = () => {
  // console.log("Render Header...");

  const history = useHistory()
  //const { data, loading, client } = useMeQuery()
  const { currentUser, setCurrentUser, client } = useContext(AuthContext)

  let body = null
  let loggedIn = currentUser !== null

  /*
  if (loading) {
    body = null
  } else if (data && loggedIn) {
    body = <div>You are logged in, {data.me.email}</div>
  } else {
    body = <div>You are not logged in.</div>
  }
  */

  const handleLogOut = async (e:any) => {
    e.preventDefault()
    try {
      await client.resetStore()
      await signOut(getAccessToken())
      setAccessToken('')
    }
    catch {
      console.error("Error in Header.handleLogOut.");
    }
    setCurrentUser!(null)
    history.push('/sign-in')
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