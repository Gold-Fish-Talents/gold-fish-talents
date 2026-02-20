<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Add Talent Details | Gold Fish Talents',
  description: 'Enter your key details to present a refined and professional talent profile.',
})

const form = reactive({
  talentCategory: 'Model',
  gender: '',
  ageRange: '',
  skinTone: '',
  height: '',
  weight: '',
  waist: '',
  chest: '',
  shoulder: '',
  hip: '',
  shoeSize: '',
  talentRoleDescription: '',
})

const talentCategories = ['Actor', 'Music Composer', 'Model', 'Makeup Artist', 'Voice Artist']

function onAddAnotherTalent() {
  // Handle adding another talent
  console.log('Adding another talent:', form)
  // Reset form or navigate to add another
}

function onAddShootDetails() {
  navigateTo('/jobs/shoot-details')
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-8 pt-28 md:pb-12 md:pt-32">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/20 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-4xl">
      <header class="mb-8 md:mb-10">
        <h1 class="text-2xl font-bold text-white md:text-3xl">Post a Job</h1>
        <p class="mt-2 text-sm text-white md:text-base">Enter your key details to present a refined and professional talent profile.</p>
      </header>

      <form class="rounded-2xl border border-white/10 bg-dark-500/95 p-6 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm md:p-8" novalidate>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <!-- Left column -->
          <div class="flex flex-col gap-5">
            <!-- Select Talent Category -->
            <div class="flex flex-col gap-2">
              <label for="talent-category" class="font-medium text-sm text-white">Select Talent Category</label>
              <select
                id="talent-category"
                v-model="form.talentCategory"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
                <option v-for="category in talentCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Gender -->
            <div class="flex flex-col gap-2">
              <label for="gender" class="font-medium text-sm text-white">Gender</label>
              <input
                id="gender"
                v-model="form.gender"
                type="text"
                placeholder="Select or enter gender"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Age Range -->
            <div class="flex flex-col gap-2">
              <label for="age-range" class="font-medium text-sm text-white">Age Range</label>
              <input
                id="age-range"
                v-model="form.ageRange"
                type="text"
                placeholder="e.g., 25-35"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Skin Tone -->
            <div class="flex flex-col gap-2">
              <label for="skin-tone" class="font-medium text-sm text-white">Skin Tone</label>
              <input
                id="skin-tone"
                v-model="form.skinTone"
                type="text"
                placeholder="Enter skin tone"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Height -->
            <div class="flex flex-col gap-2">
              <label for="height" class="font-medium text-sm text-white">Height (cm)</label>
              <input
                id="height"
                v-model="form.height"
                type="text"
                placeholder="Height in cm"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Weight -->
            <div class="flex flex-col gap-2">
              <label for="weight" class="font-medium text-sm text-white">Weight (kg)</label>
              <input
                id="weight"
                v-model="form.weight"
                type="text"
                placeholder="Weight in kg"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>

          <!-- Right column -->
          <div class="flex flex-col gap-5">
            <!-- Waist -->
            <div class="flex flex-col gap-2">
              <label for="waist" class="font-medium text-sm text-white">Waist (cm)</label>
              <input
                id="waist"
                v-model="form.waist"
                type="text"
                placeholder="Waist measurement in cm"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Chest -->
            <div class="flex flex-col gap-2">
              <label for="chest" class="font-medium text-sm text-white">Chest (cm)</label>
              <input
                id="chest"
                v-model="form.chest"
                type="text"
                placeholder="Chest measurement in cm"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Shoulder -->
            <div class="flex flex-col gap-2">
              <label for="shoulder" class="font-medium text-sm text-white">Shoulder (cm)</label>
              <input
                id="shoulder"
                v-model="form.shoulder"
                type="text"
                placeholder="Shoulder measurement in cm"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Hip -->
            <div class="flex flex-col gap-2">
              <label for="hip" class="font-medium text-sm text-white">Hip (cm)</label>
              <input
                id="hip"
                v-model="form.hip"
                type="text"
                placeholder="Hip measurement in cm"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Shoe Size -->
            <div class="flex flex-col gap-2">
              <label for="shoe-size" class="font-medium text-sm text-white">Shoe Size</label>
              <input
                id="shoe-size"
                v-model="form.shoeSize"
                type="text"
                placeholder="Enter shoe size"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>

            <!-- Talent Role Description -->
            <div class="flex flex-col gap-2">
              <label for="talent-role" class="font-medium text-sm text-white">Talent Role Description</label>
              <textarea
                id="talent-role"
                v-model="form.talentRoleDescription"
                rows="3"
                placeholder="Describe the talent role and requirements"
                class="w-full resize-none rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="font-medium rounded-xl border border-white/10 bg-dark-600/80 px-8 py-4 text-base text-white shadow-lg ring-1 ring-dark-600 transition-all hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
            @click="onAddAnotherTalent">
            Add Another Talent
          </button>
          <button
            type="button"
            class="rounded-xl bg-primary-500 px-8 py-4 text-base font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
            @click="onAddShootDetails">
            Add Shoot Budget
          </button>
        </div>
      </form>
    </div>
  </main>
</template>
