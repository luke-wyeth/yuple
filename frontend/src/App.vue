<template>
  <div class='h-full'>
    <header>

        <nav class="w-full p-2 bg-linear-65 from-orange to-orange-pink shadow-lg h-14 md:h-18 xl:h-20 mb-4 flex flex-row justify-between items-center text-white">
          <div class="flex gap-2">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </div>
          <RouterLink to="/profile"><font-awesome-icon :icon="['far', 'user']" /></RouterLink>
        </nav>

    </header>

    <RouterView />

    <nav class="sticky bottom-0 w-full bg-linear-65 from-orange-pink to-pink-purple shadow-xl h-16 md:h-20 xl:h-22"> </nav>
    <footer>
      <div class="bg-linear-65 from-purple to-navy h-24"> </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>
