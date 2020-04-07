import React, { createContext, useContext, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { User, SetUser, Client } from '../../types'
import { client } from '../../utils'

export const defaultAuthState: AuthState = {
  currentUser: null,
  setCurrentUser: null,
  client,
}

export interface AuthState {
  currentUser: User
  setCurrentUser: SetUser
  client: Client
}

export const AuthContext = createContext<AuthState>(defaultAuthState)

interface AuthContextProps { }

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  // console.log("Render AuthProvider...");
  
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

export default { AuthProvider, AuthContext }