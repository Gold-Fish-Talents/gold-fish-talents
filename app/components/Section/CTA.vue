<!-- components/SectionCTA.vue -->
<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <section :class="['relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 text-center text-white', props.class]">
    <h2 class="text-2xl font-bold md:text-3xl">Discover, hire, create.</h2>
    <p class="max-w-xl text-sm text-light-600">Start hiring today and unlock a universe of talent tailored to your next campaign or production.</p>

    <div class="mt-4 flex flex-col gap-3 sm:flex-row">
      <NuxtLink
        to="/jobs/post"
        class="font-semibold inline-flex w-full items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm text-dark-500 shadow-lg hover:bg-primary-400 sm:w-auto">
        Start hiring
      </NuxtLink>
      <NuxtLink
        to="/talents/models"
        class="font-semibold inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm text-white shadow-lg backdrop-blur-md hover:bg-white/10 sm:w-auto">
        Browse talents
      </NuxtLink>
    </div>
  </section>
</template>
