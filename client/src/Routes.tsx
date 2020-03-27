import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import { Header } from './components/Header'
import { SignOut } from './pages/SignOut'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthContext } from './components/AuthProvider';

export const Routes: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const isAuthenticated = currentUser !== null
  const isAllowed = true
  return <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-out" component={SignOut} />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          isAllowed={isAllowed}
          authenticationPath="/sign-in"
          restrictedPath="/profile"
          component={Profile}
        />
      </Switch>
    </div>
  </BrowserRouter>
}

export default Routes