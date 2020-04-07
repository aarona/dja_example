import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { MessageContext } from '..';
import { AuthContext } from '../contexts';
import { userPrivileges } from '../../utils/authentication';

export interface UnauthenticatedRouteProps extends RouteProps {
  // isAuthenticated: boolean
  // authenticationPath: string
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({
  // isAuthenticated,
  // authenticationPath,
  ...rest
}) => {
  const { currentUser } = useContext(AuthContext)
  const { setMessages } = useContext(MessageContext)
  const { isAuthenticated } = userPrivileges(currentUser)
  const authenticationPath = isAuthenticated ? '/profile' : '/sign-in'
  
  if (isAuthenticated) {
    setMessages!(['You have to be signed out to view this page!'])
    const renderComponent = () => <Redirect to={authenticationPath} />

    return <Route {...rest} component={renderComponent} render={undefined} />
  } else {
    return <Route {...rest} />
  }
}

export default UnauthenticatedRoute