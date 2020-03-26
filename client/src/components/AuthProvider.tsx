import React, { createContext, useContext, useState } from 'react'
import { IAuthState, defaultAuthState, User } from '../utils/authentication'
import { ApolloProvider } from '@apollo/react-hooks'

export const AuthContext = createContext<IAuthState>(defaultAuthState)

interface AuthContextProps { }

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const ctx  = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState<User>(null)
  ctx.currentUser = currentUser
  ctx.setCurrentUser = setCurrentUser

  return <AuthContext.Provider value={ctx}>
    <ApolloProvider client={ctx.client}>
      { children }
    </ApolloProvider>
  </AuthContext.Provider>
}