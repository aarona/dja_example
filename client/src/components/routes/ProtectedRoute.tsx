import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { MessageContext, AuthContext } from '../contexts';
import { userPrivileges } from '../../utils/authentication';

export interface ProtectedRouteProps extends RouteProps {
  // isAuthenticated: boolean
  // isAllowed: boolean
  // restrictedPath: string
  // authenticationPath: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  // isAuthenticated,
  // isAllowed,
  // restrictedPath,
  // authenticationPath,
  ...rest
}) => {
  const { setMessages } = useContext(MessageContext)
  const { currentUser } = useContext(AuthContext)
  const { isAuthenticated, isAllowed } = userPrivileges(currentUser)

  let redirectPath = ''

  if (!isAuthenticated) {
    redirectPath = '/sign-in'
  }
  if (isAuthenticated && !isAllowed) {
    redirectPath = '/profile'
  }

  if (redirectPath) {
    setMessages!(["You're not authorized to view that page."])

    const renderComponent = () => <Redirect to={redirectPath} />

    return <Route {...rest} component={renderComponent} render={undefined} />
  } else {
    return <Route {...rest} />
  }
}

export default ProtectedRoute