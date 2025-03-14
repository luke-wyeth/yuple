<template>
  <div v-if="user">
    <h1>Welcome, {{ user.username }}!</h1>
    <p>Email: {{ user.email }}</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchUserData } from '../composables/auth.js'

const user = ref(null)
const error = ref(null)

// Fetch user data function


// Fetch user data when the component is mounted
onMounted(() => {
  try {
    fetchUserData().then((userData) => {
      user.value = userData
    })
    
  } catch (err) {
    error.value = err.message
  }
})

</script>

<style scoped>
/* Add your styles here */
</style>
