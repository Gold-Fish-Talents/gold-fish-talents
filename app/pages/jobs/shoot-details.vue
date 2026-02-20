<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Shoot Details | Post a Job | Gold Fish Talents',
  description: 'Enter your key details to present a refined and professional talent profile.',
})

const form = reactive({
  shootBudget: '',
  shootLocation: '',
  shootDate: '',
  shootDescription: '',
})

function onSubmit() {
  console.log('Shoot details submitted:', form)
  // TODO: submit to API and navigate to next step or confirmation
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-8 pt-28 md:pb-12 md:pt-32">
    <!-- Cosmic / nebula-style background -->
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/30 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-2xl">
      <header class="mb-8 border-b border-primary-500/40 pb-4 md:mb-10">
        <h1 class="text-2xl font-bold text-white md:text-3xl">Post a <span class="text-primary-400">Job</span></h1>
        <p class="mt-2 text-sm text-white md:text-base">Enter your key details to present a refined and professional talent profile.</p>
      </header>

      <form class="rounded-2xl border border-white/10 bg-dark-500/95 p-6 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm md:p-8" novalidate @submit.prevent="onSubmit">
        <div class="flex flex-col gap-6">
          <!-- Shoot Budget -->
          <div class="flex flex-col gap-2">
            <label for="shoot-budget" class="font-medium text-sm text-white">Shoot Budget</label>
            <input
              id="shoot-budget"
              v-model="form.shootBudget"
              type="text"
              inputmode="decimal"
              placeholder="Enter Shoot Budget"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Shoot Location -->
          <div class="flex flex-col gap-2">
            <label for="shoot-location" class="font-medium text-sm text-white">Shoot Location</label>
            <input
              id="shoot-location"
              v-model="form.shootLocation"
              type="text"
              placeholder="Enter Shoot Location"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Shoot Date -->
          <div class="flex flex-col gap-2">
            <label for="shoot-date" class="font-medium text-sm text-white">Shoot Date</label>
            <input
              id="shoot-date"
              v-model="form.shootDate"
              type="date"
              placeholder="Shoot Date"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Shoot Description -->
          <div class="flex flex-col gap-2">
            <label for="shoot-description" class="font-medium text-sm text-white">Shoot Description</label>
            <textarea
              id="shoot-description"
              v-model="form.shootDescription"
              rows="4"
              placeholder="Describe your shoot"
              class="w-full resize-none rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="rounded-xl bg-primary-500 px-8 py-4 text-base font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500">
            Submit
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
