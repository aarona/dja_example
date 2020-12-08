import React, { useContext } from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { Maybe } from '../../utils';
import { UserResponse } from '../../utils/djaAuthentication';
import { AuthContext } from '../contexts';

interface ProtectedRouteSimpleRuleProps extends RouteProps {
  requiredAuthenticatedStatus?: AuthenticatedStatus
}

interface ProtectedRouteCustomRuleProps extends RouteProps {
  validator: AuthorizationValidator
}

export type ProtectedRouteProps = ProtectedRouteSimpleRuleProps | ProtectedRouteCustomRuleProps
export type AuthenticatedStatus = 'loggedIn' | 'loggedOut' | 'none'
export type AuthorizationValidator = (user:Maybe<UserResponse> ) => boolean

const NOT_AUTHORIZED = "You're not authorized to view that page."

const getDefaults = (props:ProtectedRouteProps) => {
  let { validator = null } = props as ProtectedRouteCustomRuleProps
  let {
    requiredAuthenticatedStatus = 'none' as AuthenticatedStatus
  } = props as ProtectedRouteSimpleRuleProps

  return { requiredAuthenticatedStatus, validator }
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { useCurrentUser } = useContext(AuthContext)!
  const [currentUser] = useCurrentUser
  const { requiredAuthenticatedStatus, validator } = getDefaults(props)

  const rejectRequest = (redirectPath: string, message: string = NOT_AUTHORIZED) => {
    return <Route {...props} render={({ location }) => {
      return <Redirect to={{
        pathname: redirectPath,
        state: {
          from: location,
          message
        }
      }} />
    }} />
  }
  
  if (requiredAuthenticatedStatus === 'loggedIn' && !currentUser) {
    return rejectRequest('/sign-in')
  }
  
  if (requiredAuthenticatedStatus === 'loggedOut' && currentUser) {
    return rejectRequest('/profile')
  }

  // If a custom validator was passed, check that the user has access to this resource
  if (validator && !validator(currentUser)) {
    return currentUser ? rejectRequest('/profile') : rejectRequest('/sign-in')
  }

  return <Route {...props} />
}

export default ProtectedRoute
