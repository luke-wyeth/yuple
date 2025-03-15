import api from '../services/api.js'

export async function fetchUserData() {
  try {
    const response = await api.get('/user/me')
    return response.data // Or handle as needed
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    throw error // Propagate the error
  }
}

export async function register(username, email, password) {
  try {
    const response = await api.post('/auth/register', {
      username: username,
      email: email,
      password: password,
    })
    return response.data.message // Or handle as needed
  } catch (error) {
    console.error('Registration failed:', error)
    throw error // Propagate the error
  }
}

export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email: email, password: password })
    return response.data.message // Or handle as needed
  } catch (error) {
    console.error('Login failed:', error)
    throw error // Propagate the error
  }
}

export async function logout() {
  try {
    const response = await api.post('/auth/logout')
    return response.data.message
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}