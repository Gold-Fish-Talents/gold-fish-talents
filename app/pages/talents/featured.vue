<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Featured Talents | Gold Fish Talents',
  description: 'Browse talent categories and discover amazing talents.',
})

const talentCategories = [
  {
    id: 'actor',
    title: 'Actors',
    description: 'Talented actors for performances and roles',
    href: '/talents/models',
    count: 156,
    mainImage: 'https://picsum.photos/seed/actor-category/400/280',
  },
  {
    id: 'music-composer',
    title: 'Music Composers',
    description: 'Skilled musicians and composers',
    href: '/talents/models',
    count: 89,
    mainImage: 'https://picsum.photos/seed/music-category/400/280',
  },
  {
    id: 'model',
    title: 'Models',
    description: 'Professional models for fashion and commercial work',
    href: '/talents/models',
    count: 234,
    mainImage: 'https://picsum.photos/seed/model-category/400/280',
  },
  {
    id: 'makeup-artist',
    title: 'Makeup Artists',
    description: 'Creative makeup artists for all occasions',
    href: '/talents/models',
    count: 67,
    mainImage: 'https://picsum.photos/seed/makeup-category/400/280',
  },
  {
    id: 'voice-artist',
    title: 'Voice Artists',
    description: 'Professional voice over artists',
    href: '/talents/models',
    count: 45,
    mainImage: 'https://picsum.photos/seed/voice-category/400/280',
  },
]

function onViewCategory(categoryId: string) {
  navigateTo(`/talents/models?type=${categoryId}`)
}

function onAddTalent(categoryId: string) {
  navigateTo(`/jobs/create?type=${categoryId}`)
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 py-8 md:py-12">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/30 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-6xl">
      <header class="mb-8 text-center md:mb-12">
        <h1 class="text-2xl font-semi-bold text-white md:text-3xl">Featured Talents</h1>
        <p class="mt-2 text-sm text-light-600 md:text-base">Browse talent categories and discover amazing professionals</p>
      </header>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="category in talentCategories"
          :key="category.id"
          class="group relative overflow-hidden rounded-2xl border border-white/10 bg-dark-500/95 shadow-xl shadow-black/20 ring-1 ring-dark-600 backdrop-blur-sm transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/10">
          <!-- Category Image -->
          <div class="aspect-[4/3] w-full overflow-hidden">
            <img :src="category.mainImage" :alt="category.title" class="size-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
          </div>

          <!-- Category Content -->
          <div class="flex flex-col gap-3 p-5">
            <div class="flex items-start justify-between gap-3">
              <div class="flex-1">
                <h2 class="text-xl font-bold text-white md:text-2xl">
                  {{ category.title }}
                </h2>
                <p class="mt-1 line-clamp-2 text-sm text-light-500">
                  {{ category.description }}
                </p>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span class="font-medium text-xs text-primary-400"> {{ category.count }} talents </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-2">
              <button
                type="button"
                class="font-medium flex-1 rounded-lg border border-white/10 bg-dark-600/80 px-4 py-2.5 text-sm text-white transition-all hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
                @click="onViewCategory(category.id)">
                View Category
              </button>
              <button
                type="button"
                class="flex-1 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semi-bold text-black transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
                @click="onAddTalent(category.id)">
                Add Talent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
