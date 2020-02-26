import React, { useState, useEffect } from 'react'
import './App.css'
import Routes from './Routes'
import { setAccessToken } from './utils/accessToken'
import { refreshToken } from './utils/authentication'

interface AppProps {

}

export const App: React.FC<AppProps> = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // console.log("INITIAL USE EFFECT CALLED.");
    
    refreshToken().then(async x => {
      // debugger
      if(x) {
        const { 'access-token':accessToken } = await x.json()
        // console.log("PAGE RELOAD ACCESS TOKEN: ", accessToken);
        
        setAccessToken(accessToken)
        setLoading(false)
      } else {
        // console.log("another error!");
        
      }
    }).catch((error) => {
      // console.log("ERROR: ", error);
      
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return <Routes/>;
}
