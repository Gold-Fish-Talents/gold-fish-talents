<!-- components/SectionTrustedBrands.vue -->
<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <section :class="['mx-auto max-w-6xl px-4', props.class]">
    <p class="font-semibold text-xs uppercase text-light-600">Brands We Work With</p>

    <div class="mt-4 grid grid-cols-2 gap-3 rounded-3xl bg-white/5 p-4 text-center text-sm text-light-400 backdrop-blur-md sm:grid-cols-4 md:grid-cols-6">
      <div v-for="n in 6" :key="n" class="font-semibold flex h-16 items-center justify-center rounded-2xl bg-white/5 text-xs">Logo</div>
    </div>
  </section>
</template>
