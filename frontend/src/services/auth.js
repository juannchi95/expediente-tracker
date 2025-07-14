const TOKEN_KEY = 'auth_token'

export const auth = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },
  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
  },
  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },
  isAuthenticated() {
    return !!auth.getToken()
  }
}