import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import Maybe from "graphql/tsutils/Maybe"

export type { Maybe }
export type Client = ApolloClient<NormalizedCacheObject>
export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>
export type Messages = null | string[]
export type SetMessages = null | Dispatch<string[]>
export type UseStateTuple<T> = [T, Dispatch<T>]