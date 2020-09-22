import React, { useContext } from 'react'
import { AuthContext } from '..'

const ProfilePage: React.FC = () => {
  const { useCurrentUser } = useContext(AuthContext)!
  const [currentUser] = useCurrentUser
  return <div>
    <h1>My Profile</h1>
    <div>Email: {currentUser?.uid}</div>
  </div>
}

export default ProfilePage