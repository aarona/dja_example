import React, { useContext } from 'react'
//import { useMeQuery } from '../generated/graphql'
import { AuthContext } from '../components/AuthProvider'

interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = () => {
  const { currentUser } = useContext(AuthContext)

  /*
  const { data, loading, error } = useMeQuery()

  if (error) {
    return <Redirect to="/" />
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!data) {
    return <div>No data found.</div>
  }
  */

  return <div>
    <h1>My Profile</h1>
    <div>Email: {currentUser?.uid}</div>
  </div>
}