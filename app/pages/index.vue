<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const title = `Gold Fish Talents`
const description = `E2E platform empowering brands to discover, manage, and collaborate with creative talents`

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
  poster: `${cdnUrl}/media/image/s_720x1280/featured-video-000-000-portrait`,
  sources: videoGenerateSources('featured-video-000-000', heroPreset),
  type: 'hero',
}
const { data: featuredTalents } = await useFetch('/api/v1/talents/models', {
  query: {
    query: '',
    queryBy: 'name',
    filterBy: 'isFeatured:=true',
    sortBy: 'name:ASC',
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
    <SectionHero :featured-video :models="featuredTalents.data" />
    <AppFooter />
  </div>
</template>

<style>
.overlay {
  @apply after:absolute after:inset-0 after:z-0 after:bg-gradient-to-b after:from-black/0 after:from-[50%] after:to-black/80 after:to-[100%] after:content-[''];
}
</style>
