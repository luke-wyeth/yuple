<template>
  <div class='h-full'>
    <header>

        <nav class="w-full bg-linear-65 from-orange to-orange-pink shadow-lg h-14 md:h-18 xl:h-20 mb-4">
          <RouterLink to="/"><font-awesome-icon :icon="['far', 'user']" /></RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>

    </header>

    <RouterView />

    <footer>
      <nav class="fixed bottom-0 w-full bg-linear-65 from-orange-pink to-pink-purple shadow-xl h-16 md:h-20 xl:h-22">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>
