import React, { useContext } from 'react'
import { AuthContext } from '..'
import { Link } from 'react-router-dom'
import { developerNote, mono } from '../layouts/styles'

const HomePage: React.FC = () => {
  const { useCurrentUser } = useContext(AuthContext)!
  const [currentUser] = useCurrentUser

  let loggedIn = currentUser !== null
  let body = ""

  if (loggedIn) {
    body = `Hello, ${currentUser?.uid}`
  }

  return <div>
    <h1>Home Page</h1>
    <div>{ body }</div>
    <p style={developerNote}>
      This app supports a custom way to protect routes. If you look at the
      <span style={mono}> /client/src/config/routes.ts</span>&nbsp;
      file, you'll see that the <span style={mono}>/unauthorized</span>&nbsp;
      route path takes a custom validator method which takes a User object
      (which you could customize by adding user roles or information to help
      you determine if the current user should be able to access this route
      or not) and return <span style={mono}>true</span> or <span style={mono}>false</span>&nbsp;
      based on your custom business rules. The route simply just returns&nbsp;
      <span style={mono}>false</span> regardless and you can test that
      you can't access this url by clicking the following <Link to="/unauthorized">Unauthorized link</Link>.
    </p>
  </div>
}

export default HomePage