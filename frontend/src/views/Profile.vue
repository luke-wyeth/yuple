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

const user = ref(null);
const error = ref(null);

// Fetch user data function
const fetchUserData = async () => {
  const token = localStorage.getItem('token');  // Retrieve JWT from localStorage (or cookie)

  if (!token) {
    error.value = 'No authentication token found';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/user/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Send JWT in Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const data = await response.json();
    user.value = data;  // Set the user data in the reactive variable
  } catch (err) {
    error.value = err.message;
  }
};

// Fetch user data when the component is mounted
onMounted(fetchUserData);
</script>

<style scoped>
/* Add your styles here */
</style>
