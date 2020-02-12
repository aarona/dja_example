import React from 'react'
import { Redirect } from 'react-router'

interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = () => {
  const error = true
  const loading = true
  const data = null

  if (error) {
    console.log(error)
    return <Redirect to={'/'} />
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data found.</div>
  }

  return <div>
    <h1>My Profile</h1>
  </div>
}