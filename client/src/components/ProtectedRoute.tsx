import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';

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
  console.log("ProtectedRoute rendered...");
  
  let redirectPath = '';
  if (!isAuthenticated) {
    redirectPath = authenticationPath;
  }
  if (isAuthenticated && !isAllowed) {
    redirectPath = restrictedPath;
  }

  if (redirectPath) {
    
    console.log("redirect with component returned");

    const renderComponent = () => <Redirect to={redirectPath} />
    return <Route {...rest} component={renderComponent} render={undefined} />
  } else {
    console.log("Empty redirectPath returned");
    
    return <Route {...rest} />
  }
}