<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// NOTE:
// This file acts as the parent route for `/jobs/create/projects/*`.
// Child pages like `/jobs/create/projects/add` render inside `<NuxtPage />`.
</script>

<template>
  <NuxtPage />
</template>
