<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Add Details | Gold Fish Talents',
  description: 'Enter your key details to present a refined and professional talent profile.',
})

const route = useRoute()
const talentType = computed(() => (route.query.type as string) || 'talent')

const form = reactive({
  fullName: '',
  gender: '',
  weight: '',
  specialisation: '',
  location: '',
  age: '',
  height: '',
  yearsOfExperience: '',
  languagesKnown: '',
})

function goToProjects() {
  navigateTo({ path: '/jobs/create/projects', query: { type: talentType.value } })
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 py-8 md:py-12">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/20 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-4xl">
      <header class="mb-8 md:mb-10">
        <h1 class="text-2xl font-bold text-primary-500 md:text-3xl">Add Details</h1>
        <p class="mt-2 text-sm text-white md:text-base">Enter your key details to present a refined and professional talent profile.</p>
      </header>

      <form class="rounded-2xl border border-white/10 bg-dark-500/95 p-6 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm md:p-8" novalidate @submit.prevent="goToProjects">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Left column -->
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label for="full-name" class="font-medium text-sm text-white">Full Name</label>
              <input
                id="full-name"
                v-model="form.fullName"
                type="text"
                placeholder="Enter your full name"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="gender" class="font-medium text-sm text-white">Gender</label>
              <input
                id="gender"
                v-model="form.gender"
                type="text"
                placeholder="Select or enter gender"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="weight" class="font-medium text-sm text-white">Weight (kg)</label>
              <input
                id="weight"
                v-model="form.weight"
                type="text"
                placeholder="Weight in Kg"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="specialisation" class="font-medium text-sm text-white">Specialisation</label>
              <input
                id="specialisation"
                v-model="form.specialisation"
                type="text"
                placeholder="Drama, Comedy, Action"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="location" class="font-medium text-sm text-white">Location</label>
              <input
                id="location"
                v-model="form.location"
                type="text"
                placeholder="Area, City"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>
          <!-- Right column -->
          <div class="flex flex-col gap-5">
            <div class="flex flex-col gap-2">
              <label for="age" class="font-medium text-sm text-white">Age</label>
              <input
                id="age"
                v-model="form.age"
                type="text"
                placeholder="Your Age"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="height" class="font-medium text-sm text-white">Height (cm)</label>
              <input
                id="height"
                v-model="form.height"
                type="text"
                placeholder="Height in cm"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="experience" class="font-medium text-sm text-white">Years of Experience</label>
              <input
                id="experience"
                v-model="form.yearsOfExperience"
                type="text"
                placeholder="Years of experience"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="languages" class="font-medium text-sm text-white">Languages Known</label>
              <input
                id="languages"
                v-model="form.languagesKnown"
                type="text"
                placeholder="e.g., Hindi, English, Bengali"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>
        </div>
        <div class="mt-8 flex justify-center">
          <button
            type="submit"
            class="w-full rounded-xl bg-primary-500 px-8 py-4 text-base font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500 md:max-w-xs">
            Create Profile
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
