import { Header, ProtectedRoute } from "../components";
import { RouteConfig } from "../components/routes/RouteIndex";
import {
  HomePage,
  ProfilePage,
  SignInPage,
  SignOutPage,
  SignUpPage
} from "../components/pages";

export const routes:RouteConfig[] = [
  {
    path: "/",
    component: HomePage,
    exact: true,
    header: Header
  },
  {
    path: "/profile",
    component: ProfilePage,
    exact: true,
    header: Header,
    routeType: ProtectedRoute,
    requiredAuthenticatedStatus: "loggedIn"
  },
  {
    path: "/sign-in",
    component: SignInPage,
    exact: true,
    header: Header,
    routeType: ProtectedRoute,
    requiredAuthenticatedStatus: "loggedOut"
  },
  {
    path: "/sign-out",
    component: SignOutPage,
    exact: true,
    header: Header,
    routeType: ProtectedRoute,
    requiredAuthenticatedStatus: "loggedIn"
  },
  {
    path: "/sign-up",
    component: SignUpPage,
    exact: true,
    header: Header,
    routeType: ProtectedRoute,
    requiredAuthenticatedStatus: "loggedOut"
  }
];