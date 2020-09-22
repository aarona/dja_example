import React, { createContext, useState } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { client, Maybe, UseStateTuple } from '../../utils'
import { UserResponse } from '../../utils/djaAuthentication'

import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

export type Client = ApolloClient<NormalizedCacheObject>
export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export interface AuthState {
  useCurrentUser: UseStateTuple<Maybe<UserResponse>>
  client: Client
}

export const AuthContext = createContext<AuthState | null>(null)

interface AuthContextProps { }

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const defaultAuthState: AuthState = {
    useCurrentUser: useState<Maybe<UserResponse>>(null),
    client
  }

  return <AuthContext.Provider value={defaultAuthState}>
    <ApolloProvider client={defaultAuthState.client}>
      {children}
    </ApolloProvider>
  </AuthContext.Provider>
}

export default { AuthProvider, AuthContext }