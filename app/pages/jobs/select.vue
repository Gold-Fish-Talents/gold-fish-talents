<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Choose your talent category | Gold Fish Talents',
  description: 'Select your talent category to create your profile on Gold Fish Talents.',
})

const talentOptions = [
  {
    id: 'actor',
    title: 'Actor',
    description: 'Showcase your acting performance and skills',
    href: '/jobs/create?type=actor',
    mainImage: 'https://picsum.photos/seed/actor-main/400/280',
    image2: 'https://picsum.photos/seed/actor-1/200/200',
    image3: 'https://picsum.photos/seed/actor-2/200/200',
  },
  {
    id: 'music-composer',
    title: 'Music Composer',
    description: 'Display your musical talents and compositions',
    href: '/jobs/create?type=music-composer',
    mainImage: 'https://picsum.photos/seed/music-main/400/280',
    image2: 'https://picsum.photos/seed/music-1/200/200',
    image3: 'https://picsum.photos/seed/music-2/200/200',
  },
  {
    id: 'model',
    title: 'Model',
    description: 'Showcase your unique look and experience',
    href: '/jobs/create?type=model',
    mainImage: 'https://picsum.photos/seed/model-main/400/280',
    image2: 'https://picsum.photos/seed/model-1/200/200',
    image3: 'https://picsum.photos/seed/model-2/200/200',
  },
  {
    id: 'makeup-artist',
    title: 'Makeup Artist',
    description: 'Showcase your unique makeup artistry and skills',
    href: '/jobs/create?type=makeup-artist',
    mainImage: 'https://picsum.photos/seed/makeup-main/400/280',
    image2: 'https://picsum.photos/seed/makeup-1/200/200',
    image3: 'https://picsum.photos/seed/makeup-2/200/200',
  },
  {
    id: 'voice-artist',
    title: 'Voice over artist',
    description: 'Showcase your voice acting range and skills',
    href: '/jobs/create?type=voice-artist',
    mainImage: 'https://picsum.photos/seed/voice-main/400/280',
    image2: 'https://picsum.photos/seed/voice-1/200/200',
    image3: 'https://picsum.photos/seed/voice-2/200/200',
  },
]

function onSelect(href: string) {
  navigateTo(href)
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-8 pt-28 md:pb-12 md:pt-32">
    <!-- Cosmic / nebula-style background -->
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/30 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-5xl">
      <header class="mb-8 text-center md:mb-12">
        <h1 class="text-2xl font-semi-bold text-white md:text-3xl">Choose your talent category</h1>
        <p class="mt-2 text-sm text-light-600 md:text-base">Select an option to continue to create your profile</p>
      </header>

      <!-- Grid: 3 top, 2 bottom (same as design) -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="option in talentOptions"
          :key="option.id"
          type="button"
          class="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-dark-500/95 shadow-xl shadow-black/20 ring-1 ring-dark-600 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/10 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
          @click="onSelect(option.href)">
          <!-- Image collage: main + two smaller -->
          <div class="flex aspect-[4/3] w-full gap-0.5 p-1.5">
            <div class="relative flex-1 overflow-hidden rounded-l-lg">
              <img :src="option.mainImage" :alt="option.title" class="size-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
            </div>
            <div class="flex w-1/3 flex-col gap-0.5">
              <div class="relative h-1/2 flex-1 overflow-hidden rounded-tr-lg">
                <img :src="option.image2" :alt="`${option.title} 1`" class="size-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              </div>
              <div class="relative h-1/2 flex-1 overflow-hidden rounded-br-lg">
                <img :src="option.image3" :alt="`${option.title} 2`" class="size-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
              </div>
            </div>
          </div>
          <!-- Title & description -->
          <div class="flex flex-col gap-1.5 p-4 text-left">
            <h2 class="text-lg font-bold text-white md:text-xl">
              {{ option.title }}
            </h2>
            <p class="line-clamp-2 text-sm text-light-500">
              {{ option.description }}
            </p>
            <span class="font-medium group-hover:text-primary-300 mt-1 text-xs text-primary-400"> Continue → </span>
          </div>
        </button>
      </div>
    </div>
  </main>
</template>
