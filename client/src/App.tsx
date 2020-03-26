import React, { useState, useEffect, useContext } from 'react'
import './App.css'
import Routes from './Routes'
import { setAccessToken } from './utils/accessToken'
import { refreshTokenResponse } from './utils/authentication'
import { AuthContext } from './components/AuthProvider'

interface AppProps {

}

export const App: React.FC<AppProps> = () => {
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

  return <Routes/>;
}
