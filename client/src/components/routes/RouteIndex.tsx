import React from 'react'
import { Route, Switch, RouteProps } from "react-router-dom";
import ProtectedRoute, { AuthenticatedStatus, AuthorizationValidator } from "./ProtectedRoute";
import { Header } from '..';
import { RouteWithSubRoutes } from '.';

export interface RouteConfig extends RouteProps {
  header?: typeof Header
  component?: React.FC
  routeType?: typeof Route | typeof ProtectedRoute
  requiredAuthenticatedStatus?: AuthenticatedStatus,
  routes?: RouteConfig[]
  validator?: AuthorizationValidator
}

interface RouteIndexProps {
  routes: RouteConfig[]
}

const RouteIndex: React.FC<RouteIndexProps> = ({ routes }) => {
  return <Switch>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
  </Switch>
}

export default RouteIndex