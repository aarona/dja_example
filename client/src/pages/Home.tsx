import React from 'react'
// import { refreshToken } from '../utils/authentication'
// import { setAccessToken, getAccessToken } from '../utils/accessToken'
// import { useMeQuery } from '../generated/graphql'

interface HomeProps {

}

export const Home: React.FC<HomeProps> = () => {
  // console.log("RENDERING HOME...");

  /*
  const {data, loading, error} = useMeQuery({ fetchPolicy: 'network-only'})
  let body = ""
  if(loading) {
    body = 'LOADING...'
  }

  if(error) {
    body = "ERROR!"
  }

  if(data) {
    body = data.me.email
  }
  */
  const body = "TESTING"
  return <div>
    <h1>Home Page</h1>
    <div>{ body }</div>
  </div>
}