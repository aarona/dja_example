import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

interface AuthenticatedRouteProps extends RouteProps {
  isAuthenticated: boolean
  authenticationPath: string
}

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  ...rest
}) => {
  const { setMessages } = useContext(AuthContext)

  if (!isAuthenticated) {
    setMessages!(['Not authenticated!'])
    const renderComponent = () => <Redirect to={authenticationPath} />

    return <Route {...rest} component={renderComponent} render={undefined} />
  } else {
    return <Route {...rest} />
  }
}

export default AuthenticatedRoute