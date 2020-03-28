import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean
  isAllowed: boolean
  restrictedPath: string
  authenticationPath: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  isAllowed,
  restrictedPath,
  authenticationPath,
  ...rest
}) => {
  const { setMessages } = useContext(AuthContext)
  let redirectPath = ''
  if (!isAuthenticated) {
    redirectPath = authenticationPath
  }
  if (isAuthenticated && !isAllowed) {
    redirectPath = restrictedPath
  }

  if (redirectPath) {
    console.log("Unauthorized! Redirecting...");
    
    setMessages!(['You are not authorized to view that page.'])
    const renderComponent = () => <Redirect to={redirectPath} />

    return <Route {...rest} component={renderComponent} render={undefined} />
  } else {
    return <Route {...rest} />
  }
}

export default ProtectedRoute