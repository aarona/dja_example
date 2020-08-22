import React, { useState, useEffect, useContext } from 'react'
import Routes from './Routes'
import { setAccessToken, refreshTokenResponse } from './utils'
import { AuthContext } from './components'

function App() {
  const [loading, setLoading] = useState(true)
  const { setCurrentUser } = useContext(AuthContext)

  useEffect(() => {
    refreshTokenResponse().then(data => {
      let { user, accessToken } = data

      setCurrentUser!(user)
      setAccessToken(accessToken)
      setLoading(false)

    }).catch((error) => {
      setCurrentUser!(null)
      setAccessToken('')
      setLoading(false)
    })
  }, [setCurrentUser])

  if (loading) {
    return <div>Loading...</div>
  }

  return <Routes />;
}

export default App;
