import { ApolloClient } from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { InMemoryCache } from 'apollo-cache-inmemory'
import jwtDecode from 'jwt-decode'
import { getAccessToken, setAccessToken } from './accessToken'
import { refreshToken } from './djaAuthentication'

const cache = new InMemoryCache({})

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any
    Promise.resolve(operation)
      .then(operation => {
        const accessToken = getAccessToken()
        if (accessToken) {
          console.log("accessToken: ", accessToken);
          console.log("Setting access-token header...")
          operation.setContext({
            headers: {
              'access-token': accessToken
            }
          })
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        })
      })
      .catch(observer.error.bind(observer))

    return () => {
      if (handle) handle.unsubscribe()
    }
  })
)

export const client = new ApolloClient({
  link: ApolloLink.from([new TokenRefreshLink({
    accessTokenField: 'access-token',
    isTokenValidOrUndefined: () => {
      const token = getAccessToken()

      if (!token) {
        return true
      }

      try {
        const { exp } = jwtDecode(token)
        if (Date.now() >= exp * 1000) {
          return false
        } else {
          return true
        }
      } catch (error) {
        return false
      }
    },
    fetchAccessToken: () => {
      return refreshToken()
    },
    handleFetch: accessToken => {
      setAccessToken(accessToken)
    },
    handleError: err => {
      console.error(err)
    }
  }),
  onError((errorObj) => {
    console.error(errorObj)
  }),
    requestLink,
  new HttpLink({
    uri: "http://localhost:3001/graphql",
    credentials: "include"
  })
  ]),
  cache
})