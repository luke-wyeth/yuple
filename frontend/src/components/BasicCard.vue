<template>
  <div class="relative">
    <div
      :class="{
        'blur absolute inset-0 rounded-md bg-gradient-to-br from-orange via-orange-pink via-pink-purple via-purple via-pink-purple via-orange-pink to-orange':
          glowingBorder,
      }"
    />

    <div
      class="relative rounded-md bg-gray-100 ring-1 ring-gray-900/5"
      :class="{
        'shadow-lg': !glowingBorder,
      }"
    >
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  glowingBorder: Boolean,
});
</script>