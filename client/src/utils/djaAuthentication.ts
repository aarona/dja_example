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

export interface ErrorResponse {
  fullMessages: string[]
}

export interface UserResponse {
  uid: string,
  allowPasswordChange: boolean,
}

export interface ChangePasswordResponse {
  success: boolean
  user?: UserResponse
  message: string
  accessToken: string
  errors?: ErrorResponse
}

export interface RefreshTokenResponse {
  status: string
  user?: UserResponse
  accessToken: string
  errors?: ErrorResponse
}

export interface ResetPasswordResponse {
  success: boolean
  message: string
  errors?: ErrorResponse
}

export interface SignInResponse {
  user?: UserResponse
  accessToken?: string
  errors?: ErrorResponse
}

export interface SignOutResponse {
  success: boolean
}

export interface SignUpResponse {
  status: string
  user?: UserResponse
  accessToken?: string
  errors?: ErrorResponse
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

      return { status: response.status, user, accessToken } as SignUpResponse
    } else {
      const { status, errors} = response.errors

      return { status, errors } as SignUpResponse
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
    })
  }).then((response) => {
    return response.json()
  }).then((response) => {
    const accessToken = response[accessTokenField]

    if (response && accessToken) {
      
      const user = parseUserResponse(response.data)
      
      return { user, accessToken } as SignInResponse
    } else {
      return { errors: { fullMessages: response.errors} } as SignInResponse
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
    }
  }).then((response) => {
    return response.json()
  }).then((response) => {
    const { success } = response

    return { success } as SignOutResponse
  })
}

export const requestPasswordReset = async (
  email: string,
  redirectUrl?: string,
) => {
  const body = { email } as any

  if (redirectUrl) { body['redirect_url'] = redirectUrl }

  return fetch(`${endPoint}/password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then((response) => {
    return response.json()
  }).then((response) => {
    console.log("requestPasswordReset: ", response);
    
    const { status, success, message, errors } = response

    return { status, success, message, errors } as ResetPasswordResponse
  })
}

export const changePasswordWithCurrentPassword = async (
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
  accessToken: string
) => {
  return fetch(`${endPoint}/password`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [accessTokenField]: accessToken
    },
    body: JSON.stringify({
      password,
      password_confirmation: passwordConfirmation,
      current_password: currentPassword
    })
  }).then((response) => {
    return response.json()
  }).then((response) => {
    const { success, data: user, message, errors, [accessTokenField]: accessToken } = response

    return { success, user, message, errors, accessToken } as ChangePasswordResponse
  })
}

export const changePassword = async (
  password: string,
  passwordConfirmation: string,
  resetPasswordToken: string
) => {
  return fetch(`${endPoint}/password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password,
      password_confirmation: passwordConfirmation,
      reset_password_token: resetPasswordToken
    })
  }).then((response) => {
    return response.json()
  }).then((response) => {
    const { success, data: user, errors, message, [accessTokenField]: accessToken } = response

    return { success, user, message, accessToken, errors } as ChangePasswordResponse
  })
}

export const requestRefreshToken = () => {
  return fetch(`${endPoint}/refresh_token`, {
    method: "GET",
    credentials: "include"
  })
}

export const refreshTokenResponse = async () => {
  const response = await requestRefreshToken()
  let data = await response.json()
  const { status } = data
  const accessToken = data[accessTokenField]

  if (data && accessToken) {
    const user = parseUserResponse(data.data)

    return { status, accessToken, user } as RefreshTokenResponse
  }
  else {
    const errors = data.errors
    return { status, user: undefined, errors, accessToken: '' } as RefreshTokenResponse
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
