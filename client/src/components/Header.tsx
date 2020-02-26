import React from 'react'
import { Link } from 'react-router-dom'
import { setAccessToken } from '../utils/accessToken'
import { useMeQuery } from '../generated/graphql'
interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
  // console.log("RENDERING HEADER...");
  
  const { data, loading, client } = useMeQuery()

  let body = null
  let loggedIn = false

  if (loading) {
    body = null
  } else if (data) {
    loggedIn = true
    body = <div>You are logged in, {data.me.email}</div>
  } else {
    body = <div>You are not logged in.</div>
  }
  
  return <header>
    <div><Link to="/">Home</Link></div>
    {loggedIn ? "" : <div><Link to="/register">Register</Link></div>}
    {loggedIn ? "" : <div><Link to="/login">Login</Link></div>}
    {loggedIn ? <div><Link to="/profile">Protected Page</Link></div> : ""}
    {loggedIn ? (<div>
      <Link to="/logout" onClick={async (e) => {
        e.preventDefault()
        // debugger
        setAccessToken("")
        try {
          await client!.resetStore()
        }
        catch {
          console.log("LOG OUT ERROR OCCURED");
          
        }
      }}>Log out</Link></div>
    ) : (
      ""
    )}
    {body}
  </header>
}