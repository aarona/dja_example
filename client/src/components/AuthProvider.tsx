import React, { createContext, useContext, useState } from 'react'
import { AuthState, defaultAuthState, User } from '../utils/authentication'
import { ApolloProvider } from '@apollo/react-hooks'

export const AuthContext = createContext<AuthState>(defaultAuthState)

interface AuthContextProps { }

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const ctx  = useContext(AuthContext)
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [messages, setMessages] = useState<string[]>([])

  ctx.currentUser = currentUser
  ctx.setCurrentUser = setCurrentUser
  ctx.messages = messages
  ctx.setMessages = setMessages
  
  return <AuthContext.Provider value={ctx}>
    <ApolloProvider client={ctx.client}>
      { children }
    </ApolloProvider>
  </AuthContext.Provider>
}

export default { AuthProvider, AuthContext }