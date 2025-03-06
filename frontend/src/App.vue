<template>
  <div class='h-full min-h-screen flex flex-col'>
    <header>

        <nav class="w-full bg-linear-65 from-orange to-orange-pink shadow-lg h-14 md:h-18 xl:h-20 p-4 flex flex-row justify-between items-center text-white">
          <div class="flex gap-2">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </div>
          <RouterLink to="/profile"><font-awesome-icon :icon="['far', 'user']" /></RouterLink>
        </nav>

    </header>

    <RouterView class="p-4 flex-grow"/>

    <nav class="sticky bottom-0 w-full bg-linear-65 from-orange-pink to-pink-purple shadow-xl p-4 h-16 md:h-20 xl:h-22"> </nav>
    <footer>
      <div class="bg-linear-65 from-purple to-navy p-4 h-24"> </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>
