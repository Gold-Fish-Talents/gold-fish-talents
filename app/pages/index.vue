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
</script>

<template>
  <div class="relative min-h-screen">
    <SectionHero />
    <SectionBrands />
    <SectionCaption />
  </div>
</template>
