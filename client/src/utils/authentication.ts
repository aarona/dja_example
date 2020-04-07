import { User } from "../types"

// configuration
const host = "http://localhost:3001"
const mountPoint = "/auth"
const endPoint = `${host}${mountPoint}`
const accessTokenName = 'access-token'

export interface UserResponse {
  allowPasswordChange: boolean,
  uid: string,
  email: string,
  provider: string
}

export interface RefreshTokenResponse {
  status: string
  user: null | UserResponse
  accessToken: string
  errors?: any
}

export interface SignInResponse {
  user: null | UserResponse
  errors?: any
  accessToken?: string
}

export interface SignOutResponse {
  success: boolean
}

export interface SignUpResponse {
  status: string
  user: null | UserResponse
  accessToken?: string
  errors?: any
}

interface UserPrivileges {
  isAuthenticated: boolean
  isAllowed: boolean
}

export const signUp = async (email: string, password: string, passwordConfirmation?: string) => {
  if(!passwordConfirmation) {
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
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    if (data && data[accessTokenName]) {
      const { allow_password_change: allowPasswordChange, uid, email, provider } = data.data
      return {
        user: {
          allowPasswordChange,
          uid,
          email,
          provider
        },
        accessToken: data[accessTokenName]
      } as SignUpResponse
    } else {
      return {
        user: null,
        errors: data.errors
      } as SignUpResponse
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
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    if (data && data[accessTokenName]) {
      const { allow_password_change: allowPasswordChange, uid, email, provider } = data.data
      const result: SignInResponse = {
        user: {
          allowPasswordChange,
          uid,
          email,
          provider
        },
        accessToken: data[accessTokenName]
      }
      
      return result      
    } else {
      const result: SignInResponse = {
        user: null,
        errors: data.errors
      }

      return result
    }
  })
}

export const signOut = async (accessToken:string) => {
  return fetch(`${endPoint}/sign_out`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'access-token': accessToken
    },
  })
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    const { success } = data
    const result: SignOutResponse = {
      success
    }

    return result
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

  if (data && data[accessTokenName]) {
    const { allow_password_change: allowPasswordChange, uid, email, provider } = data.data
    return {
      status,
      accessToken: data[accessTokenName],
      user: {
        allowPasswordChange,
        uid,
        email,
        provider
      }
    } as RefreshTokenResponse
  }
  else {
    return {
      status,
      user: null,
      errors: data.errors,
      accessToken: ''
    } as RefreshTokenResponse
  }
}

export const userPrivileges = (currentUser: User) => {
  if (currentUser) {

    // simulates roles
    const userHasRole = (currentUser: User, role: string) => {
      // todo: get roles from User later
      const roles = ['USER']
      return roles.includes(role)
    }

    return {
      isAuthenticated: true,
      isAllowed: userHasRole(currentUser, 'ADMIN'),
    } as UserPrivileges
  } else {
    return {
      isAuthenticated: false,
      isAllowed: false,
    } as UserPrivileges
  }
}
