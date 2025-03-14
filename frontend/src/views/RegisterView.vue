<template>
  <div>
    <h2>Register</h2>
    <input v-model="username" placeholder="Username" />
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="registerUser">Register</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { register } from '../composables/auth.js'

const username = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

const registerUser = () => {
  register(username.value, email.value, password.value).then((returnedMessage) => {
    message.value = returnedMessage
  })
}
</script>
