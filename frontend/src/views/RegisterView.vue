<template>
  <div>
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="register">Register</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

const register = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', res.data.token) // Store JWT token
    message.value = 'Registration successful! You are now logged in.'
  } catch (err) {
    message.value = err.response?.data?.error || 'Registration failed'
  }
}
</script>
