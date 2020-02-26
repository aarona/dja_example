
import React, { createContext, useState } from 'react'
import { IStore } from '../utils/interfaces'
import { client } from '../utils/gqlClients'
import { ApolloProvider } from '@apollo/react-hooks'

export const StoreContext = createContext<IStore | null>(null)

interface StoreContextProps {
}

export const StoreProvider: React.FC<StoreContextProps> = ({ children }) => {
  const clientTuple = useState(client)
  const [c] = clientTuple
  const store:IStore = {
    useClient: clientTuple
  }
  return <StoreContext.Provider value={store}>
    <ApolloProvider client={c}>
      { children }
    </ApolloProvider>
  </StoreContext.Provider>
}