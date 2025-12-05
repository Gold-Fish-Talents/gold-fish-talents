<!-- components/SectionDiscover.vue -->
<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <section :class="['mx-auto max-w-5xl px-4 text-left text-white', props.class]">
    <h2 class="max-w-3xl text-2xl font-bold md:text-4xl">Discover, hire, and collaborate with India’s finest talent.</h2>
    <p class="mt-4 max-w-3xl text-sm text-light-600 md:text-base">
      Access curated models, actors, voice artists, music composers, and makeup artists through a single unified platform designed for brands, agencies, and creators.
    </p>
  </section>
</template>
