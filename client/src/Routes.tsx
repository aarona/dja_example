import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import { routes } from './config/routes'
import { RouteIndex } from './components/routes'

const Routes: React.FC = () => {
  return <Router>
    <RouteIndex routes={routes} />
  </Router>
}

export default Routes