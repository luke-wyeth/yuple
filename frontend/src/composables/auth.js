import axios from 'axios'

export async function fetchUserData () {
    const token = localStorage.getItem('token')  // Retrieve JWT from localStorage (or cookie)
  
    if (!token) {
      error.value = 'No authentication token found'
      return
    }
  
    const response = await fetch('http://localhost:3000/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Send JWT in Authorization header
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user data')
    }

  }

export async function register(username, email, password) {
  const res = await axios.post('http://localhost:3000/auth/register', {
    username: username,
    email: email,
    password: password
  })

  localStorage.setItem('token', res.data.token) // Store JWT token
  return 'Registration successful! You are now logged in.'
}

export async function login(email, password) {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', { email: email, password: password })
    localStorage.setItem('token', res.data.accessToken) // Save token
    return 'Login successful'
  } catch (err) {
    console.log(err)
    return 'Invalid credentials'
  }
}