import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { MessageContext, AuthContext } from '../contexts';
// import { User } from '../../types';
import { userPrivileges } from '../../utils/authentication';



export interface AuthenticatedRouteProps extends RouteProps {
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  ...rest
}) => {
  // console.log("Render AuthenticatedRoute...");
  const { currentUser } = useContext(AuthContext)
  const { setMessages } = useContext(MessageContext)
  const { isAuthenticated } = userPrivileges(currentUser)
  const authenticationPath = isAuthenticated ? '/profile' : '/sign-in'
  // console.log("Auth Route currentUser/auth: ", { currentUser, isAuthenticated, authenticationPath});

  if (!isAuthenticated) {
    setMessages!(["You're not authorized to view that page."])
    // console.log("AuthenticatedRoute redirecting to ", authenticationPath);
    
    const renderComponent = () => <Redirect to={authenticationPath} />

    return <Route {...rest} component={renderComponent} render={undefined} />
  } else {
    return <Route {...rest} />
  }
}

export default AuthenticatedRoute