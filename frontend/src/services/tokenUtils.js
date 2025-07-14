export const parseJwt = (token) => {
  try {
    const base64Payload = token.split('.')[1]
    const jsonPayload = atob(base64Payload)
    return JSON.parse(jsonPayload)
  } catch (e) {
    return null
  }
}

export const isTokenExpired = (token) => {
  const payload = parseJwt(token)
  if (!payload?.exp) return true
  const now = Math.floor(Date.now() / 1000)
  return payload.exp < now
}