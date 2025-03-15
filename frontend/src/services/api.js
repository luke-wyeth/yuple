import axios from 'axios'
import { logout } from '../composables/auth.js' // Assuming you have a logout function

const api = axios.create({
  baseURL: 'http://localhost:3000', // Your backend base URL
  withCredentials: true, // Crucial for cookies
})

let isRefreshing = false
let refreshSubscribers = []

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

function onRefreshed(token) {
  refreshSubscribers.map((cb) => cb(token))
  refreshSubscribers = []
}

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve) {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Cookie = `accessToken=${token}`
            resolve(api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const response = await api.post('/refresh-token')
        const { accessToken } = response.data

        onRefreshed(accessToken)
        originalRequest.headers.Cookie = `accessToken=${accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // Handle refresh token failure (e.g., logout)
        logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api