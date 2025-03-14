<template>
  <div>
    <input v-model="email" placeholder="email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="loginUser">Login</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../composables/auth.js'

const email = ref('')
const password = ref('')
const message = ref('')

const loginUser = async () => {
  login(email.value, password.value).then((returnedMessage) => {
    message.value = returnedMessage
  })
}
</script>
