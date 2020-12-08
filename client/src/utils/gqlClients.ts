import { ApolloClient } from 'apollo-client'
import { ApolloLink, Observable } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { InMemoryCache } from 'apollo-cache-inmemory'
import jwtDecode from 'jwt-decode'
import { getAccessToken, requestRefreshToken, setAccessToken } from './djaAuthentication'

const cache = new InMemoryCache({})
const host = process.env.REACT_APP_HOST!
const accessTokenField = process.env.REACT_APP_ACCESS_TOKEN_FIELD!

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle: any
    Promise.resolve(operation)
      .then(operation => {
        const accessToken = getAccessToken()
        if (accessToken) {
          operation.setContext({
            headers: {
              [accessTokenField]: accessToken
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
      .catch(() => {
        observer.error.bind(observer)
      })

    return () => {
      if (handle) handle.unsubscribe()
    }
  })
)

export const client = new ApolloClient({
  link: ApolloLink.from([new TokenRefreshLink({
    accessTokenField: accessTokenField,
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
      return requestRefreshToken()
    },
    handleResponse: (_, accessTokenField) => (response: Response) => {
      return response.text().then((body) => {
        const data = JSON.parse(body)
        return { [accessTokenField]: data[accessTokenField] }
      })
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
    uri: `${host}/graphql`,
    credentials: "include"
  })
  ]),
  cache
})