<!-- components/SectionMeetStars.vue -->
<script setup lang="ts">
interface Model {
  id: string
  name: string
  photo: string
  url: string
}

const props = defineProps<{
  models: Model[]
  class?: string
}>()
</script>

<template>
  <section :class="['mx-auto max-w-6xl px-4 text-white', props.class]">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 class="text-2xl font-bold md:text-3xl">Meet our Stars</h2>
        <p class="mt-2 max-w-md text-sm text-light-600">A handpicked constellation of talents ready to bring your next project to life.</p>
      </div>

      <NuxtLink to="/talents/models" class="font-semibold mt-2 text-sm text-primary-400 hover:text-primary-500"> View all talents → </NuxtLink>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <NuxtLink v-for="{ id, name, photo, url } in models" :key="id" :to="url" class="group relative overflow-hidden rounded-3xl bg-white/5 shadow-lg backdrop-blur-md">
        <img :src="photo" :alt="name" class="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div class="absolute inset-x-0 bottom-0 p-4">
          <p class="font-semibold text-sm">{{ name }}</p>
          <p class="text-xs text-light-600">View profile</p>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
