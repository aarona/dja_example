import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { setAccessToken, getAccessToken } from '../utils/accessToken'

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
  const accessToken = getAccessToken()
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  let body = null
  let loggedIn = false
/*
  console.log("FETCHING SELF...");
  
  fetch(`http://localhost:3001/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': accessToken
    }
  })
  .then((response) => {
    //const authentication = getHeaders(response.headers)
    console.log("FETCHED RESPONSE...", response.headers)

    return response.json()
  })
  .then((d) => {
    // setLoading(false)
    // setData(d)
  })
*/
  if (loading) {
    body = null
  } else if (data) {
    loggedIn = true
    body = <div>You are logged in</div>
  } else {
    body = <div>You are not logged in.</div>
  }
  
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