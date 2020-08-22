import React, { createContext, useContext, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from '../../utils'
import { UserResponse } from '../../utils/djaAuthentication'

import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

export type Client = ApolloClient<NormalizedCacheObject>
export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>
export type User = null | UserResponse
export type SetUser = null | Dispatch<User>

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
  const ctx = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState<User>(null)

  ctx.currentUser = currentUser
  ctx.setCurrentUser = setCurrentUser

  return <AuthContext.Provider value={ctx}>
    <ApolloProvider client={ctx.client}>
      {children}
    </ApolloProvider>
  </AuthContext.Provider>
}

export default { AuthProvider, AuthContext }