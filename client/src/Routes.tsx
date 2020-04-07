import React /**, { useContext, useEffect }*/ from 'react'
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
  PageContainer,
  ProtectedRoute,
  // AuthContext,
  UnauthenticatedRoute,
  AuthenticatedRoute
} from './components'
// import { User } from './types'

const Routes: React.FC = () => {
  // console.log("Render Routes...");
  
  // const { currentUser } = useContext(AuthContext)
  // console.log("currentUser: ", currentUser);
  // 
  // // simulates roles
  // const getUserRole = (currentUser: User) => {
  //   return 'USER'
  // }
  // 
  // const isAuthenticated = currentUser !== null
  // const isAllowed = getUserRole(currentUser) === 'ADMIN'
  // const authenticationPath = isAuthenticated ? '/profile' : '/sign-in'
  
  return <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => { return <PageContainer><Home /></PageContainer> }}
      />
      <UnauthenticatedRoute
        exact
        path="/sign-up"
        render={() => { return <PageContainer><SignUp/></PageContainer> }}
      />
      <UnauthenticatedRoute
        exact
        path="/sign-in"
        render={() => { return <PageContainer><SignIn/></PageContainer> }}
      />
      <UnauthenticatedRoute
        exact
        path="/sign-out"
        render={() => { return <PageContainer><SignOut/></PageContainer> }}
      />
      <AuthenticatedRoute
        exact
        path="/profile"
        render={() => { return <PageContainer><Profile/></PageContainer> }}
      />
      <ProtectedRoute
        exact
        path="/unauthorized"
        // isAuthenticated={isAuthenticated}
        // isAllowed={isAllowed}
        // authenticationPath={authenticationPath}
        // restrictedPath={authenticationPath}
        render={() => {
          return <PageContainer><UnauthorizedPage/></PageContainer>
        }}
      />
    </Switch>
  </BrowserRouter>
}

export default Routes