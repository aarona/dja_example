import { ApolloClient } from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { InMemoryCache } from 'apollo-cache-inmemory'
import jwtDecode from 'jwt-decode'
import { getAccessToken, setAccessToken } from './accessToken'
import { refreshToken } from './authentication'


const cache = new InMemoryCache({})

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any
    Promise.resolve(operation)
      .then(operation => {
        const accessToken = getAccessToken()
        if (accessToken) {
          operation.setContext({
            headers: {
              'access-token': accessToken
            }
            // TODO: use authorization/bearer for a more standard way
            // of authenticating through headers.
            // headers: {
            //   authorization: `bearer ${accessToken}`
            // }
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
      // console.log("isTokenValidOrUndefined: called")

      const token = getAccessToken()

      if (!token) {
        // console.log("isTokenValidOrUndefined: access token undefined.")

        return true
      }

      // console.log("isTokenValidOrUndefined: access token defined. Checking expiration...");

      try {
        const { exp } = jwtDecode(token)
        if (Date.now() >= exp * 1000) {
          // console.log("isTokenValidOrUndefined: access token expired!");
          return false
        } else {
          // console.log("isTokenValidOrUndefined: access token still valid!");
          return true
        }
      } catch (error) {
        // console.log("isTokenValidOrUndefined: error occured!");
        return false
      }
    },
    fetchAccessToken: () => {
      // console.log("fetchAccessToken: called")

      return refreshToken()
    },
    handleFetch: accessToken => {
      // console.log("handleFetch: called")

      setAccessToken(accessToken)
    },
    handleError: err => {
      // console.warn('handleError: Your refresh token is invalid. Try to relogin')
      // console.error(err)
    }
  }),
  onError(({ graphQLErrors, networkError }) => {
    // console.log("onError: called");
    // console.log(graphQLErrors)
    // console.log(networkError)
  }),
    requestLink,
    new HttpLink({
      uri: "http://localhost:3001/graphql",
      credentials: "include"
    })
  ]),
  cache
})