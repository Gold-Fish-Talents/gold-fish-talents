<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const title = `Gold Fish Talents`
const description = `Locality‑focused, talent marketplace where models, voice actors, makeup artist, designer etc can be found for commercial shoot`

const {
  public: { siteUrl, cdnUrl },
} = useRuntimeConfig()
const imageUrl = `${siteUrl}/previews/landing.webp`

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  ogUrl: siteUrl,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [{ name: 'Home', item: '/' }],
  }),
])

const featuredVideo = {
  id: 'featured-video-000-000',
  title: 'featured-video-000-000',
  description: 'The Hero Video featuring of all Gold Fish Talents projects',
  poster: `${cdnUrl}/media/image/w_1920&h_1080/featured-video-000-000-landscape`,
  sources: videoGenerateSources('featured-video-000-000', heroPreset),
  type: 'hero',
}
const { data: featuredTalents } = await useFetch('/api/v1/talents/models', {
  query: {
    query: '',
    queryBy: 'name',
    filterBy: 'isFeatured:=true',
    sortBy: 'name:asc',
    perPage: 8,
  },
  default: () => ({
    models: [],
    count: 0,
    page: 1,
    perPage: 8,
  }),
})
</script>

<template>
  <div class="relative">
    <SectionHero :featured-video :models="featuredTalents.models" />
    <footer class="round relative flex w-full flex-col items-center gap-4 px-4 py-6 text-white">
      <ul class="grid grid-flow-col grid-cols-4 grid-rows-3 gap-y-2 whitespace-nowrap">
        <li class="col-start-1">
          <NuxtLink to="/terms">Terms</NuxtLink>
        </li>
        <li class="col-start-1">
          <NuxtLink to="/privacy">Privacy</NuxtLink>
        </li>
        <li class="col-start-2">
          <NuxtLink to="/contact">Contact us</NuxtLink>
        </li>
        <!-- Social Media -->
        <li class="col-span-2 col-start-3 row-start-3 flex justify-end gap-3 fill-white">
          <NuxtLink to="https://www.facebook.com/goldfishbowltalent" target="_blank">
            <NuxtIcon name="local:facebook" class="text-[28px]" />
          </NuxtLink>
          <NuxtLink to="https://www.instagram.com/goldfishbowltalent" target="_blank">
            <NuxtIcon name="local:instagram" class="text-[28px]" />
          </NuxtLink>
          <NuxtLink to="https://x.com/goldfishbowltalent" target="_blank">
            <NuxtIcon name="local:x" class="text-[28px]" />
          </NuxtLink>
        </li>
      </ul>
      <div class="w-full border-t border-dark-600" />
      <NuxtLink to="https://shirsendu-bairagi.dev" target="__blank" class="flex items-center gap-1">
        <span>Made by</span>
        <NuxtIcon name="local:shba007" filled class="text-[20px]" />
      </NuxtLink>
      <span class="text-xs">&copy; Gold Fish Talents 2025. All rights reserved.</span>
    </footer>
  </div>
</template>

<style>
.overlay {
  @apply after:absolute after:inset-0 after:z-0 after:bg-gradient-to-b after:from-black/0 after:from-[50%] after:to-black/80 after:to-[100%] after:content-[''];
}
</style>
