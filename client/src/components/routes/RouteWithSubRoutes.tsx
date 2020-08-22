import React from 'react'
import { Route as DefaultRoute } from 'react-router-dom'
import { ProtectedRoute } from '.'
import { Role } from '../../utils/authentication'
import { PageContainer } from '..'
import RouteIndex, { RouteConfig } from './RouteIndex'

export interface RouteWithSubRoutesProps extends RouteConfig {}

const RouteWithSubRoutes: React.FC<RouteWithSubRoutesProps> = ({
  header,
  routeType: Route = DefaultRoute,
  component,
  requiredAuthenticatedStatus = "none",
  requiredRoles = new Set<Role>(),
  routes,
  ...rest
}) => {
  switch (Route) {
    case ProtectedRoute:
      return <Route
        {...rest}
        requiredAuthenticatedStatus={requiredAuthenticatedStatus}
        requiredRoles={requiredRoles}
        render={props => {
          if (routes) {
            return <RouteIndex {...props} routes={routes} />;
          } else {
            const Page = component!
            return <PageContainer {...props} header={header}><Page /></PageContainer>
          }
        }}
      />
    default:
      return <Route {...rest} render={props => {
        if (routes) {
          return <RouteIndex {...props} routes={routes} />;
        } else {
          const Page = component!
          return <PageContainer {...props} header={header}><Page /></PageContainer>
        }
      }} />
  }
}

export default RouteWithSubRoutes

/*
function RouteWithSubRoutes1({
  header,
  component: Component,
  path,
  routes,
  ...rest
}) {
  return (
    <Route
      path={path}
      render={props => {
        if (routes) {
          // pass the sub-routes down to keep nesting
          return <RouteIndex {...props} routes={routes} />;
        } else {
          return (
            <Route
              path={path}
              render={props => {
                return (
                  <PageLayout header={header}>
                    <Component {...props} />
                  </PageLayout>
                );
              }}
            />
          );
        }
      }}
    />
  );
}
*/
