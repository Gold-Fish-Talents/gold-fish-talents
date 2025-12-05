<script setup lang="ts">
definePageMeta({
  middleware: ['guest'],
})

const title = `Gold Fish Talents`
const description = `E2E platform empowering brands to discover, manage, and collaborate with creative talents`

const {
  public: { siteUrl },
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

/* const featuredVideo = {
  id: 'featured-video-000-000',
  title: 'featured-video-000-000',
  description: 'The Hero Video featuring of all Gold Fish Talents projects',
  poster: `${cdnUrl}/media/image/s_720x1280/featured-video-000-000-portrait`,
  sources: videoGenerateSources('featured-video-000-000', heroPreset),
  type: 'hero',
} */
const { data: featuredTalents } = await useAPI('/api/v1/talents/models', {
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
  <div class="relative min-h-screen">
    <SectionHero />
    <SectionSpotlight />
    <SectionTrustedBrands class="mt-12 md:mt-20" />
    <SectionDiscover class="mt-16 md:mt-24" />
    <SectionMeetStars class="mt-16 md:mt-24" :models="featuredTalents?.models ?? []" />
    <SectionOurWork class="mt-16 md:mt-24" />
    <SectionCTA class="mt-16 md:mt-24" />
  </div>
</template>

<style></style>
