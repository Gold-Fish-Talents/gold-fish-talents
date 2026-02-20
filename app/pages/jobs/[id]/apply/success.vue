<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const jobId = route.params.id as string

useSeoMeta({
  title: 'Application Submitted | Gold Fish Talents',
  description: 'Your application has been submitted successfully.',
})

const job = ref({
  id: jobId,
  title: 'Luxury Jewellery Ad Shoot',
  brand: 'Aurora Jewels',
})

const handleBackToJobs = () => {
  navigateTo('/jobs')
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-10 pt-28 md:pt-32">
    <!-- Cosmic background -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(80,80,120,0.6)_0,_transparent_45%),radial-gradient(circle_at_bottom,_rgba(40,40,80,0.7)_0,_#020617_55%)]"
      aria-hidden="true" />

    <div class="mx-auto w-full max-w-2xl">
      <div class="bg-slate-900/70 ring-slate-800/80 rounded-2xl border border-white/10 p-8 text-center shadow-xl ring-1 backdrop-blur-md">
        <div class="mb-6 flex justify-center">
          <div class="bg-emerald-500/20 rounded-full p-4">
            <svg class="text-emerald-400 h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 class="mb-4 text-2xl font-bold text-white md:text-3xl">Application Submitted Successfully!</h1>
        <p class="mb-6 text-sm text-white/70 md:text-base">
          Your application for <span class="font-semibold text-primary-300">{{ job.brand }}</span> has been submitted. You will be notified once the client reviews your application.
        </p>
        <button
          type="button"
          class="rounded-full bg-primary-500 px-8 py-3 text-sm font-semi-bold text-black shadow-lg shadow-primary-500/40 transition-colors hover:bg-primary-400"
          @click="handleBackToJobs">
          Back to Jobs
        </button>
      </div>
    </div>
  </main>
</template>
