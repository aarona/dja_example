import React, { useContext } from 'react'
import { AuthContext } from '..'
import { Link } from 'react-router-dom'


const HomePage: React.FC = () => {
  const { useCurrentUser } = useContext(AuthContext)!
  const [currentUser] = useCurrentUser

  let loggedIn = currentUser !== null
  let body = ""

  if (loggedIn) {
    body = `Hello, ${currentUser?.uid}`
  }

  const mono = { fontFamily: "monospace", fontWeight: "bold" } as React.CSSProperties

  return <div>
    <h1>Home Page</h1>
    <div>{ body }</div>
    <div style={{ paddingTop: "15px", width: 600 }}>
      This app supports a custom way to protect routes. If you look at the
      <span style={mono}> /client/src/config/routes.ts </span>
      file, you'll see that the <span style={mono}>/unauthorized </span>
      route path takes a custom validator method which takes a User object
      (which you could customize by adding user roles or information to help
      you determine if the current user should be able to access this route
      or not) and return <span style={mono}>true</span> or <span style={mono}>false </span>
      based on your custom business rules. The route simply just returns
      <span style={mono}> false</span> regardless and you can test that
      you can't access this url by clicking the following <Link to="/unauthorized">Unauthorized link</Link>.
    </div>
  </div>
}

export default HomePage