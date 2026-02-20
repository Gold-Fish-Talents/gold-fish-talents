<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Post a Job | Gold Fish Talents',
  description: 'Post a job and find the perfect talent for your project.',
})

const form = reactive({
  jobTitle: '',
  brandName: '',
  talentCategory: '',
  jobDescription: '',
  requirements: [] as string[],
})

const talentCategories = ['Actor', 'Music Composer', 'Model', 'Makeup Artist', 'Voice Artist']

const newRequirement = ref('')

function addRequirement() {
  if (newRequirement.value.trim()) {
    form.requirements.push(newRequirement.value.trim())
    newRequirement.value = ''
  }
}

function removeRequirement(index: number) {
  form.requirements.splice(index, 1)
}

function onSubmit() {
  console.log('Add Shoot Details clicked')
  console.log('Form data:', form)
  navigateTo('/jobs/add-talent-details')
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-8 pt-28 md:pb-12 md:pt-32">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/20 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-4xl">
      <header class="mb-8 md:mb-10">
        <h1 class="text-2xl font-bold text-white md:text-3xl">Post a Job</h1>
        <p class="mt-2 text-sm text-white md:text-base">Find the perfect talent for your project</p>
      </header>

      <form class="rounded-2xl border border-white/10 bg-dark-500/95 p-6 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm md:p-8" novalidate @submit.prevent="onSubmit">
        <div class="flex flex-col gap-6">
          <!-- Job Title -->
          <div class="flex flex-col gap-2">
            <label for="job-title" class="font-medium text-sm text-white">Job Title</label>
            <input
              id="job-title"
              v-model="form.jobTitle"
              type="text"
              placeholder="Enter job title"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Brand Name -->
          <div class="flex flex-col gap-2">
            <label for="brand-name" class="font-medium text-sm text-white">Brand Name</label>
            <input
              id="brand-name"
              v-model="form.brandName"
              type="text"
              placeholder="Enter brand name"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Select Talent Category -->
          <div class="flex flex-col gap-2">
            <label for="talent-category" class="font-medium text-sm text-white">Select Talent Category</label>
            <select
              id="talent-category"
              v-model="form.talentCategory"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="" disabled>Select a category</option>
              <option v-for="category in talentCategories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Job Description -->
          <div class="flex flex-col gap-2">
            <label for="job-description" class="font-medium text-sm text-white">Job Description</label>
            <textarea
              id="job-description"
              v-model="form.jobDescription"
              rows="4"
              placeholder="Describe the job role and responsibilities"
              class="w-full resize-none rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Requirements -->
          <div class="flex flex-col gap-2">
            <label class="font-medium text-sm text-white">Requirements</label>
            <div class="flex gap-2">
              <input
                v-model="newRequirement"
                type="text"
                placeholder="Add a requirement"
                class="flex-1 rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                @keydown.enter.prevent="addRequirement" />
              <button
                type="button"
                class="rounded-xl bg-primary-500 px-6 py-3.5 text-sm font-semi-bold text-black transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
                @click="addRequirement">
                Add
              </button>
            </div>
            <div v-if="form.requirements.length > 0" class="mt-2 flex flex-wrap gap-2">
              <div v-for="(requirement, index) in form.requirements" :key="index" class="flex items-center gap-2 rounded-lg bg-dark-600/80 px-3 py-2 text-sm text-white">
                <span>{{ requirement }}</span>
                <button type="button" class="hover:text-primary-300 text-primary-400" @click="removeRequirement(index)">×</button>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-4 flex justify-center">
            <button
              type="button"
              class="w-full rounded-xl bg-primary-500 px-8 py-4 text-base font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500 md:max-w-xs"
              @click="onSubmit">
              Add Shoot Details
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
