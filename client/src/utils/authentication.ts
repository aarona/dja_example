const host = "http://localhost:3001"
const mountPoint = "/auth"
const endPoint = `${host}${mountPoint}`

export const signUp = (email: string, password: string) => {

  fetch(`${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      password_confirmation: password
    })
  })
  .then((response) => {
    const headers = getHeaders(response.headers)
    console.log(headers);
    return response.json()
  })
  .then((data) => {
    // console.log(data);
  })
  .catch((error) => {
    // console.error('ERROR: ', error);
  })
}

export const signIn = async (
  email: string,
  password: string
) => {
  // console.log("FETCHING...");

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
    // const authentication = getHeaders(response.headers)
    // console.log("FETCHED RESPONSE...", authentication)

    return response.json()
  })
}

export const refreshToken = () => {
  //console.log("refreshToken: called");
  
  return fetch(`${endPoint}/refresh_token`, {
    method: "GET",
    credentials: "include"
  })
}

interface Hash {
  [key: string]: string 
}

const getHeaders = (headers: Headers) => {
  const keys = headers.keys()
  let headerObj: Hash = {}
  let header = keys.next()

  while (header.value) {
    headerObj[header.value] = headers.get(header.value)!
    header = keys.next()
  }

  return headerObj
}