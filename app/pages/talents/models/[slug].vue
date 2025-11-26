<script setup lang="ts">
definePageMeta({
  layout: false,
})

const {
  public: { siteUrl, cdnUrl },
} = useRuntimeConfig()

const route = useRoute()
const slug = route.params.slug!.toString()
const { data: model } = await useFetch(`/api/v1/talents/models/${slug}`)
if (!model.value) {
  throw createError({ statusCode: 404, statusMessage: 'Model not found' })
}
const photos = model.value.projects[0]?.media.photo
const videos = model.value.projects[0]?.media.video

const title = `${model.value?.name}`
const description = `${model.value?.description}`
const imageUrl = `${cdnUrl}/h_1024/${extractCdnId(model.value?.photo.image)}`

useSeoMeta({
  title: title,
  ogTitle: title,
  twitterTitle: title,
  description: description,
  ogDescription: description,
  twitterDescription: description,
  ogImage: imageUrl,
  twitterImage: imageUrl,
  ogUrl: `${siteUrl}/talents/models/${slug}`,
})

useSchemaOrg([
  defineImage({
    url: `${siteUrl}/photo/${slug}`,
    contentUrl: imageUrl,
    caption: description,
    width: 720,
    height: Math.round(720 * (9 / 16)),
  }),
])

const { width } = useWindowSize()

const imageModifiers = computed(() => {
  return width.value >= 768
    ? { fit: 'contain' } // for md and up
    : { fit: 'cover' } // for small screens
})

const isModelDetailOpen = ref(false)
const { start: startModelDetailTimer } = useTimeoutFn(
  () => {
    isModelDetailOpen.value = true
  },
  3000,
  { immediate: false }
)

onMounted(() => {
  startModelDetailTimer()
})

const shareAsset = ref<ShareAsset>({
  name: title,
  url: `${siteUrl}/talents/models/${slug}`,
})
</script>

<template>
  <main v-if="model" class="relative flex flex-col gap-8 p-2">
    <section id="hero" class="relative -left-2 -top-2 isolate h-screen w-screen">
      <NuxtImg
        :src="extractCdnId(model.photo.image)"
        :alt="`${model.name} hero image`"
        :height="Math.round(720 / (1 / 2))"
        :fit="imageModifiers.fit"
        :placeholder="[0, Math.round(360 / (1 / 2)), 50, 5]"
        class="absolute inset-0 -z-10 h-full w-full object-cover object-top md:object-contain" />
      <!-- <CompositionOverlay /> -->
      <CardModelDetail class="absolute bottom-24 left-0" :model="model" :is-open="isModelDetailOpen" @is-open="(value) => (isModelDetailOpen = value)" />
    </section>
    <PhotoGallery v-if="photos" :photos="photos" />
    <VideoGallery v-if="videos" :videos="videos" />
    <FloatActionBar :share-asset="shareAsset" :asset-type="'model'" />
  </main>
</template>

<style scoped>
img {
  view-transition-name: selected-model;
}
</style>
