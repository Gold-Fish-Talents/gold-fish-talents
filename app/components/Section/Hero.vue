<script setup lang="ts">
defineProps<{
  featuredVideo: {
    id: string
    title: string
    description: string
    poster: string
    sources: globalThis.Source[]
    type: string
  }
  models: Model[]
}>()
</script>

<template>
  <section class="overlay relative -left-2 isolate h-screen w-screen md:-left-4">
    <div class="absolute bottom-0 left-0 z-10 flex w-full flex-col gap-3 px-4 py-8 text-white">
      <div>
        <p class="font-sub text-lg font-semi-bold uppercase [text-shadow:2px_2px_4px_rgba(0,0,0,0.25)]">
          Where Talent meets
          <br />
          <strong class="my-2 inline-block text-2xl font-regular">Opportunity</strong>
        </p>
        <p class="text-base [text-shadow:2px_2px_4px_rgba(0,0,0,0.25)]">Connect with nearby <br />talents with ease</p>
      </div>
      <div class="scrollbar-hidden relative w-full overflow-x-scroll">
        <div class="flex w-fit gap-6">
          <MarkerModel v-for="{ id, photo, name, url } in models" :id="id" :key="id" :photo="photo" :name="name" :url="url" />
        </div>
      </div>
      <div class="flex gap-2">
        <NuxtLink to="/auth/signin" class="text-md w-full rounded-full bg-light-500 px-4 py-3 text-center text-primary-500 dark:bg-dark-500"> Sign In </NuxtLink>
        <NuxtLink to="/talents/models" class="text-md w-full rounded-full bg-primary-500 px-4 py-3 text-center text-dark-500"> Get started </NuxtLink>
      </div>
    </div>
    <NuxtVideo
      v-if="featuredVideo"
      class="absolute left-1/2 top-0 col-span-full col-start-1 row-span-full row-start-1 h-screen w-screen -translate-x-1/2 object-cover"
      :source="featuredVideo.sources"
      :poster="featuredVideo.poster"
      :disable-picture-in-picture="true"
      controls-list="nodownload"
      :autoplay="true"
      :muted="true"
      :playsinline="true"
      :loop="true"
      preload="metadata" />
  </section>
</template>
