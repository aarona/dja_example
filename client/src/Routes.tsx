import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Profile } from './pages/Profile'
import { Header } from './components/Header'
import { SignOut } from './pages/SignOut'

export const Routes: React.FC = () => {
  return <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-out" component={SignOut} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </div>
  </BrowserRouter>
}

export default Routes