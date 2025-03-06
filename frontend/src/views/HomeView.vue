<template>
  <main>
    Home

    <basic-card :glowing-border="true" class="mb-12"> <div class="h-24">this is a glowing card</div> </basic-card>
    <basic-card :glowing-border="false"> <div class="h-24">this is a basic card</div> </basic-card>
  </main>
</template>

<script setup lang="ts">
import BasicCard from '../components/BasicCard.vue'
</script>