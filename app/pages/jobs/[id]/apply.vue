<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const jobId = route.params.id as string

useSeoMeta({
  title: 'Apply to Job | Gold Fish Talents',
  description: 'Enter your key details to present a refined and professional talent profile.',
})

// Mock job data
const job = ref({
  id: jobId,
  title: 'Luxury Jewellery Ad Shoot',
  brand: 'Aurora Jewels',
})

// Mock applicant data
const applicant = ref({
  name: 'Ayesha Dutta',
  gender: 'Female',
  ageRange: '22-28 yrs',
  phone: '+91 98765 43210',
  email: 'ayesha.dutta@example.com',
  location: 'Mumbai, Maharashtra',
})

const form = reactive({
  talentCategory: 'Model',
  portfolioType: 'goldfish',
  coverLetter: "In only two sentences, present your experience, why you're passionate, and discuss how you can contribute your unique talent.",
  availability: 'yes',
})

const showCancelModal = ref(false)
const talentCategories = ['Model', 'Makeup Artist', 'Actor', 'Voice over artist', 'Media Composer']

const handleCancel = () => {
  showCancelModal.value = true
}

const confirmCancel = () => {
  navigateTo(`/jobs/${jobId}`)
}

const cancelCancel = () => {
  showCancelModal.value = false
}

const handleApply = () => {
  // Handle application submission
  console.log('Applying with:', form)
  // Navigate to success page or show confirmation
  navigateTo(`/jobs/${jobId}/apply/success`)
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-10 pt-28 md:pt-32">
    <!-- Cosmic background -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(80,80,120,0.6)_0,_transparent_45%),radial-gradient(circle_at_bottom,_rgba(40,40,80,0.7)_0,_#020617_55%)]"
      aria-hidden="true" />

    <div class="mx-auto w-full max-w-3xl">
      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-2xl font-bold text-white md:text-3xl">Apply to {{ job.brand }}</h1>
        <p class="mt-2 text-sm text-white/70 md:text-base">Enter your key details to present a refined and professional talent profile.</p>
      </header>

      <!-- Application Form -->
      <form class="bg-slate-900/70 ring-slate-800/80 rounded-2xl border border-white/10 p-6 shadow-xl ring-1 backdrop-blur-md md:p-8" novalidate @submit.prevent="handleApply">
        <!-- Applicant Profile -->
        <section class="bg-slate-800/50 mb-6 rounded-lg border border-white/10 p-4">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-semibold mb-2 text-base text-white">{{ applicant.name }} | {{ applicant.gender }} | {{ applicant.ageRange }}</h3>
              <div class="space-y-1 text-sm text-white/70">
                <div class="flex items-center gap-2">
                  <span class="font-medium">Phone:</span>
                  <span>{{ applicant.phone }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">Email:</span>
                  <span>{{ applicant.email }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="font-medium">Location:</span>
                  <span>{{ applicant.location }}</span>
                </div>
              </div>
            </div>
            <button type="button" class="font-medium rounded-full border border-primary-500/50 bg-transparent px-4 py-2 text-sm text-primary-400 transition-colors hover:bg-primary-500/10">
              Edit
            </button>
          </div>
        </section>

        <!-- Select Talent Category -->
        <section class="mb-6">
          <label class="font-medium mb-2 block text-sm text-white"> Select Talent Category </label>
          <select
            v-model="form.talentCategory"
            class="bg-slate-800/50 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option v-for="category in talentCategories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </section>

        <!-- Portfolio Selection -->
        <section class="mb-6">
          <label class="font-medium mb-3 block text-sm text-white"> Portfolio Selection </label>
          <div class="space-y-3">
            <label class="bg-slate-800/50 hover:bg-slate-800/70 flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-4 transition-colors">
              <input v-model="form.portfolioType" type="radio" value="goldfish" class="h-4 w-4 cursor-pointer text-primary-500 focus:ring-primary-500" />
              <span class="text-sm text-white">Use my Goldfish Portfolio</span>
            </label>
            <label class="bg-slate-800/50 hover:bg-slate-800/70 flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 p-4 transition-colors">
              <input v-model="form.portfolioType" type="radio" value="custom" class="h-4 w-4 cursor-pointer text-primary-500 focus:ring-primary-500" />
              <span class="text-sm text-white">Use Custom Portfolio</span>
            </label>
          </div>
        </section>

        <!-- Cover Letter -->
        <section class="mb-6">
          <label class="font-medium mb-2 block text-sm text-white"> Cover Letter / Motivation </label>
          <p class="mb-2 text-xs text-white/60">Tell us why you're a good fit for this project.</p>
          <textarea
            v-model="form.coverLetter"
            rows="4"
            class="bg-slate-800/50 w-full rounded-lg border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="In only two sentences, present your experience, why you're passionate, and discuss how you can contribute your unique talent."></textarea>
        </section>

        <!-- Availability -->
        <section class="mb-6">
          <label class="font-medium mb-3 block text-sm text-white"> Are you available on the shoot date? </label>
          <div class="flex gap-4">
            <label class="flex cursor-pointer items-center gap-2">
              <input v-model="form.availability" type="radio" value="yes" class="h-4 w-4 cursor-pointer text-primary-500 focus:ring-primary-500" />
              <span class="text-sm text-white">Yes</span>
            </label>
            <label class="flex cursor-pointer items-center gap-2">
              <input v-model="form.availability" type="radio" value="no" class="h-4 w-4 cursor-pointer text-primary-500 focus:ring-primary-500" />
              <span class="text-sm text-white">No</span>
            </label>
          </div>
        </section>

        <!-- Action Buttons -->
        <div class="flex gap-4 border-t border-white/10 pt-6">
          <button
            type="button"
            class="font-medium flex-1 rounded-full border border-primary-500/50 bg-transparent px-6 py-3 text-sm text-primary-400 transition-colors hover:bg-primary-500/10"
            @click="handleCancel">
            Cancel
          </button>
          <button type="submit" class="flex-1 rounded-full bg-primary-500 px-6 py-3 text-sm font-semi-bold text-black shadow-lg shadow-primary-500/40 transition-colors hover:bg-primary-400">
            Apply
          </button>
        </div>
      </form>
    </div>

    <!-- Cancellation Confirmation Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="showCancelModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" @click.self="cancelCancel">
        <div class="bg-slate-900/95 ring-slate-800/80 w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl ring-1 backdrop-blur-xl" @click.stop>
          <h3 class="font-semibold mb-4 text-lg text-white">Are you sure you want to cancel your application?</h3>
          <div class="flex gap-4">
            <button
              type="button"
              class="font-medium flex-1 rounded-full border border-primary-500/50 bg-transparent px-6 py-3 text-sm text-primary-400 transition-colors hover:bg-primary-500/10"
              @click="confirmCancel">
              Yes, Cancel
            </button>
            <button
              type="button"
              class="flex-1 rounded-full bg-primary-500 px-6 py-3 text-sm font-semi-bold text-black shadow-lg shadow-primary-500/40 transition-colors hover:bg-primary-400"
              @click="cancelCancel">
              No, Continue
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>
