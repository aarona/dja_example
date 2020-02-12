import React from 'react'
import { Link } from 'react-router-dom'
import { setAccessToken } from '../utils/accessToken'

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
  const loggedIn = false
  const body = "filler text"
  
  return <header>
    <div><Link to="/">Home</Link></div>
    {loggedIn ? "" : <div><Link to="/register">Register</Link></div>}
    {loggedIn ? "" : <div><Link to="/login">Login</Link></div>}
    <div><Link to="/protected">Protected Page</Link></div>
    {loggedIn ? (<div>
      <button onClick={async () => {
        //await logout()
        setAccessToken("")
        //await client!.resetStore()
      }}>Log out</button></div>
    ) : (
        ""
      )}
    {body}
  </header>
}