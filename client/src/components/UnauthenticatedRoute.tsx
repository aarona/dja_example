import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { AuthContext } from '.';

export interface UnauthenticatedRouteProps extends RouteProps {
  isAuthenticated: boolean
  authenticationPath: string
}

export const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  ...rest
}) => {
  const { setMessages } = useContext(AuthContext)

  if (isAuthenticated) {
    setMessages!(['Unauthenticated!'])
    const renderComponent = () => <Redirect to={authenticationPath} />

    return <Route {...rest} component={renderComponent} render={undefined} />
  } else {
    return <Route {...rest} />
  }
}

export default UnauthenticatedRoute