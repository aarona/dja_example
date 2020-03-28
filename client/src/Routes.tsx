import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'
import {
  Home,
  SignIn,
  SignUp,
  Profile,
  SignOut,
  UnauthorizedPage
} from './pages'
import {
  Header,
  ProtectedRoute,
  AuthContext,
  UnauthenticatedRoute,
  AuthenticatedRoute,
  Messages
} from './components'

export const Routes: React.FC = () => {
  const { currentUser, messages } = useContext(AuthContext)
  const isAuthenticated = currentUser !== null
  const isAllowed = false
  let userMessages:string[] = []
  console.log("Messages: ", messages);
  
  if(messages) {
    userMessages = messages
  }

  useEffect(() => {
    /** */
    console.log("Loading messages...");
    //setMessages!([])
    
  }, [])
  console.log("isAuthenticated: ", isAuthenticated);
  
  return <BrowserRouter>
    <div>
      <Header />
      <Messages messages={userMessages}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <UnauthenticatedRoute
          authenticationPath="/profile"
          isAuthenticated={isAuthenticated}
          exact
          path="/sign-up"
          component={SignUp}
        />
        <UnauthenticatedRoute
          authenticationPath="/profile"
          isAuthenticated={isAuthenticated}
          exact
          path="/sign-in"
          component={SignIn}
        />
        <UnauthenticatedRoute
          exact
          path="/sign-out"
          isAuthenticated={isAuthenticated}
          authenticationPath="/sign-in"
          component={SignOut}
        />
        <AuthenticatedRoute
          exact
          path="/profile"
          isAuthenticated={isAuthenticated}
          authenticationPath="/sign-in"
          component={Profile}
        />
        <ProtectedRoute
          exact
          path="/unauthorized"
          isAuthenticated={isAuthenticated}
          isAllowed={isAllowed}
          authenticationPath="/sign-in"
          restrictedPath="/profile"
          component={UnauthorizedPage}
        />
      </Switch>
    </div>
  </BrowserRouter>
}

export default Routes