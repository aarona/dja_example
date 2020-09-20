import { Maybe } from "./types"

// configuration
const host = process.env.REACT_APP_HOST!
const mountPoint = process.env.REACT_APP_AUTH_MOUNT_POINT!
const endPoint = `${host}${mountPoint}`
const accessTokenField = process.env.REACT_APP_ACCESS_TOKEN_FIELD!

let accessToken = ""

export const setAccessToken = (token: string) => {
  accessToken = token
}

export const getAccessToken = () => {
  return accessToken
}

export interface UserResponse {
  uid: string,
  allowPasswordChange: boolean,
}

export interface RefreshTokenResponse {
  status: string
  user: Maybe<UserResponse>
  accessToken: string
  errors?: any
}

export interface SignInResponse {
  user: Maybe<UserResponse>
  errors?: any
  accessToken?: string
}

export interface SignOutResponse {
  success: boolean
}

export interface SignUpResponse {
  status: string
  user: Maybe<UserResponse>
  accessToken?: string
  errors?: any
}

export const signUp = async (
  email: string,
  password: string,
  passwordConfirmation?: string
) => {
  if (!passwordConfirmation) {
    passwordConfirmation = password
  }

  return fetch(`${endPoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      password_confirmation: passwordConfirmation
    })
  }).then((response) => {
    return response.json()
  }).then((response) => {
    const accessToken = response[accessTokenField]

    if (response && accessToken) {
      const user = parseUserResponse(response.data)

      return { user, accessToken } as SignUpResponse
    } else {
      const errors = response.errors

      return { user: null, errors } as SignUpResponse
    }
  })
}

export const signIn = async (
  email: string,
  password: string
) => {
  return fetch(`${endPoint}/sign_in`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    }),
  }).then((response) => {
    return response.json()
  }).then((response) => {
    const accessToken = response[accessTokenField]

    if (response && accessToken) {
      const user = parseUserResponse(response.data)

      return { user, accessToken } as SignInResponse
    } else {
      return { user: null, errors: response.errors } as SignInResponse
    }
  })
}

export const signOut = async (accessToken: string) => {
  return fetch(`${endPoint}/sign_out`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [accessTokenField]: accessToken
    },
  }).then((response) => {
    return response.json()
  }).then((response) => {
    const { success } = response

    return { success } as SignOutResponse
  })
}

export const refreshToken = () => {
  return fetch(`${endPoint}/refresh_token`, {
    method: "GET",
    credentials: "include"
  })
}

export const refreshTokenResponse = async () => {
  const response = await refreshToken()
  let data = await response.json()
  const { status } = data
  const accessToken = data[accessTokenField]

  if (data && accessToken) {
    const user = parseUserResponse(data.data)

    return { status, accessToken, user } as RefreshTokenResponse
  }
  else {
    const errors = data.errors
    return { status, user: null, errors, accessToken: '' } as RefreshTokenResponse
  }
}

const parseUserResponse = (data: any): UserResponse => {
  return {
    uid: data.uid,
    provider: data.provider,
    email: data.email,
    allowPasswordChange: data.allow_password_change
  } as UserResponse
}
