let accessToken = ""

export const setAccessToken = (token: string) => {
  // console.log("setAccessToken: called");
  accessToken = token
}

export const getAccessToken = () => {
  // console.log("getAccessToken: called");
  return accessToken
}