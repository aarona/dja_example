import React from 'react'
import { Redirect } from 'react-router'
import { useMeQuery } from '../generated/graphql'

interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = () => {
  const { data, loading, error } = useMeQuery()

  if (error) {
    // console.log(error)
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
    <div>Email: {data.me.email}</div>
  </div>
}