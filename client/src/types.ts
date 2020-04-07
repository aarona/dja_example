import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

export type Client = ApolloClient<NormalizedCacheObject>
export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>
export type User = null | { uid: string }
export type SetUser = null | Dispatch<User>
export type Messages = null | string[]
export type SetMessages = null | Dispatch<string[]>