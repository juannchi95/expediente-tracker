import { auth } from './auth'
import { isTokenExpired } from './tokenUtils'

export const authFetch = async (url, options = {}) => {
  const token = auth.getToken()

  if (!token || isTokenExpired(token)) {
    auth.removeToken()
    window.location.href = '/login'
    return Promise.reject(new Error('Token expirado o no válido'))
  }

  const headers = {
    ...(options.headers || {}),
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  if (response.status === 401) {
    auth.removeToken()
    window.location.href = '/login'
  }

  return response
}