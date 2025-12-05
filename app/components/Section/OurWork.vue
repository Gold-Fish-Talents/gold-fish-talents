<!-- components/SectionOurWork.vue -->
<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <section :class="['mx-auto max-w-5xl px-4 text-center text-white', props.class]">
    <h2 class="text-2xl font-bold md:text-3xl">Our Work</h2>
    <p class="mt-2 text-sm text-light-600">Work that speaks for itself — campaigns, shoots, and productions powered by Gold Fish Talents.</p>

    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <div v-for="n in 3" :key="n" class="h-40 rounded-3xl bg-[radial-gradient(circle_at_top,_#1f2937,_#020617)]" />
    </div>
  </section>
</template>
