<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const jobId = route.params.id as string

useSeoMeta({
  title: 'Job Details | Gold Fish Talents',
  description: 'View job details and apply for opportunities.',
})

// Mock job data
const job = ref({
  id: jobId,
  title: 'Luxury Jewellery Ad Shoot',
  brand: 'Aurora Jewels',
  location: 'Mumbai (IN-MH)',
  shootDate: '10 February 2024',
  posted: '3 days ago',
  overview:
    'Aurora Jewels is looking for a professional model and a makeup artist for an upcoming brand shoot. The project involves coordinated styling, on-set collaboration, and a professional production setup.',
  shootDescription:
    'The shoot is a commercial jewellery advertisement involving both photography and short-form video content. The shoot will take place in a professional studio setting with high-end lighting and equipment. We are looking for talents who can work collaboratively and bring creativity to the project.',
  modelRequirements: [
    {
      gender: 'Female',
      ageRange: '22-28 yrs',
      height: '5\'5" - 5\'9"',
      skinTone: 'Clear, even complexion preferred',
      experience: 'Prior experience in jewellery, fashion, or commercial shoots is a bonus',
    },
    {
      gender: 'Female',
      ageRange: '22-28 yrs',
      height: '5\'5" - 5\'9"',
      skinTone: 'Clear, even complexion preferred',
      experience: 'Prior experience in jewellery, fashion, or commercial shoots is a bonus',
    },
  ],
  makeupArtistRequirements: {
    experience: 'Minimum 3 years of experience in commercial and fashion makeup',
    skills: 'Proficiency in natural and glamour makeup styles',
    portfolio: 'Strong portfolio showcasing jewellery and fashion work',
  },
})

const isSaved = ref(false)

const toggleSave = () => {
  isSaved.value = !isSaved.value
}

const handleApply = () => {
  navigateTo(`/jobs/${jobId}/apply`)
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-10 pt-28 md:pt-32">
    <!-- Cosmic background -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(80,80,120,0.6)_0,_transparent_45%),radial-gradient(circle_at_bottom,_rgba(40,40,80,0.7)_0,_#020617_55%)]"
      aria-hidden="true" />

    <div class="mx-auto w-full max-w-4xl">
      <!-- Job Card -->
      <article class="bg-slate-900/70 ring-slate-800/80 rounded-2xl border border-white/10 p-6 shadow-xl ring-1 backdrop-blur-md md:p-8">
        <!-- Header -->
        <div class="mb-6 flex items-start justify-between">
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-white md:text-3xl">
              {{ job.title }}
            </h1>
          </div>
          <button type="button" class="hover:bg-slate-800/50 rounded-lg p-2 transition-colors" @click="toggleSave">
            <NuxtIcon name="local:love" class="text-xl transition-colors" :class="isSaved ? 'text-primary-500' : 'text-white/50'" />
          </button>
        </div>

        <!-- Key Information -->
        <div class="mb-6 space-y-3 border-b border-white/10 pb-6">
          <div class="flex items-center gap-2 text-sm text-white/80">
            <span class="font-medium text-primary-300">Brand:</span>
            <span>{{ job.brand }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-white/80">
            <span class="font-medium text-primary-300">Shoot Location:</span>
            <span>{{ job.location }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-white/80">
            <span class="font-medium text-primary-300">Shoot Date:</span>
            <span>{{ job.shootDate }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm text-white/80">
            <span class="font-medium text-primary-300">Posted:</span>
            <span>{{ job.posted }}</span>
          </div>
        </div>

        <!-- Job Overview -->
        <section class="mb-6">
          <h2 class="font-semibold mb-3 text-lg text-white">Job Overview</h2>
          <p class="text-sm leading-relaxed text-white/70">
            {{ job.overview }}
          </p>
        </section>

        <!-- Talent Requirements -->
        <section class="mb-6">
          <h2 class="font-semibold mb-4 text-lg text-white">Talent Requirements</h2>

          <!-- Model Requirements -->
          <div v-for="(requirement, index) in job.modelRequirements" :key="index" class="mb-6 last:mb-0">
            <h3 class="font-medium text-primary-300 mb-3 text-base">Model {{ index + 1 }} Requirements</h3>
            <div class="bg-slate-800/50 space-y-2 rounded-lg p-4">
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Gender:</span>
                <span class="text-white/70">{{ requirement.gender }}</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Age Range:</span>
                <span class="text-white/70">{{ requirement.ageRange }}</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Height:</span>
                <span class="text-white/70">{{ requirement.height }}</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Skin Tone:</span>
                <span class="text-white/70">{{ requirement.skinTone }}</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Experience:</span>
                <span class="text-white/70">{{ requirement.experience }}</span>
              </div>
            </div>
          </div>

          <!-- Makeup Artist Requirements -->
          <div class="mb-6">
            <h3 class="font-medium text-primary-300 mb-3 text-base">Makeup Artist Requirements</h3>
            <div class="bg-slate-800/50 space-y-2 rounded-lg p-4">
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Experience:</span>
                <span class="text-white/70">{{ job.makeupArtistRequirements.experience }}</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Skills:</span>
                <span class="text-white/70">{{ job.makeupArtistRequirements.skills }}</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="font-medium text-white/80">Portfolio:</span>
                <span class="text-white/70">{{ job.makeupArtistRequirements.portfolio }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Shoot Description -->
        <section class="mb-6">
          <h2 class="font-semibold mb-3 text-lg text-white">Shoot Description</h2>
          <p class="text-sm leading-relaxed text-white/70">
            {{ job.shootDescription }}
          </p>
        </section>

        <!-- Action Buttons -->
        <div class="flex gap-4 border-t border-white/10 pt-6">
          <button
            type="button"
            class="font-medium flex-1 rounded-full border border-primary-500/50 bg-transparent px-6 py-3 text-sm text-primary-400 transition-colors hover:bg-primary-500/10"
            @click="toggleSave">
            Save For Later
          </button>
          <button
            type="button"
            class="flex-1 rounded-full bg-primary-500 px-6 py-3 text-sm font-semi-bold text-black shadow-lg shadow-primary-500/40 transition-colors hover:bg-primary-400"
            @click="handleApply">
            Apply
          </button>
        </div>
      </article>
    </div>
  </main>
</template>
