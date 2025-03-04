<template>
  <main>
    User
    {{firstname}} {{message}}
  </main>
</template>


<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const firstname = route.params.firstname

const message = ref('')

onMounted(async () => {

    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:3000/api/dashboard', {
    headers: { Authorization: `Bearer ${token}` }
    })
    console.log(res.data)


  try {
    const response = await axios.get('http://localhost:3000/user/lastname/' + firstname)
    message.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

</script>
