import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

export type UseStateTuple<T> = [T, React.Dispatch<React.SetStateAction<T>>]
export type Client = ApolloClient<NormalizedCacheObject>

export interface IStore {
  useClient: UseStateTuple<Client>
}