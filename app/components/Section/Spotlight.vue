<script setup lang="ts"></script>

<template>
  <section class="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 pb-16 pt-20 text-center text-white">
    <h2 class="text-3xl font-bold tracking-tight md:text-5xl">Where Stars Find Their Spotlight</h2>

    <p class="max-w-2xl text-sm text-light-600 md:text-base">
      Discover, hire, and collaborate with India’s finest talent — models, actors, voice artists, music composers, and makeup artists. All in one seamless platform.
    </p>

    <div class="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
      <NuxtLink
        to="/jobs/post"
        class="font-semibold inline-flex w-full items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm text-dark-500 shadow-lg hover:bg-primary-400 sm:w-auto">
        Post a Job
      </NuxtLink>

      <NuxtLink
        to="/auth/signup"
        class="font-semibold inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white shadow-lg backdrop-blur-md hover:bg-white/10 sm:w-auto">
        Join as Talent
      </NuxtLink>
    </div>
  </section>
</template>
