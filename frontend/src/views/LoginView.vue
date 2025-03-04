<template>
  <div>
    <input v-model="email" placeholder="email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Login</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/auth/login', { email: email.value, password: password.value })
    localStorage.setItem('token', res.data.token) // Save token
    message.value = 'Login successful'
  } catch {
    message.value = 'Invalid credentials'
  }
}
</script>
