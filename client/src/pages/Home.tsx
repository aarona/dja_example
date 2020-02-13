import React from 'react'
import { refreshToken } from '../utils/authentication'
import { setAccessToken, getAccessToken } from '../utils/accessToken'

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  const onSubmit = async (e:any) => {
    e.preventDefault()

    
    try {
      const data = await refreshToken()
      console.log("FETCHED DATA...", data)
      setAccessToken(data['access-token'])
      console.log("ACCESS TOKEN: ", getAccessToken());
    } catch (error) {
      console.error('ERROR: ', error)
    }
  }

  return <div>
    <h1>Home Page</h1>
    <form onSubmit={onSubmit}>
      <button type="submit">Refresh Token</button>
    </form>
  </div>
}