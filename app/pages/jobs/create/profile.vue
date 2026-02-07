<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Profile | Gold Fish Talents',
  description: 'Manage your talent profile and projects.',
})

const user = useUser()
const userName = computed(() => user?.name || 'User')

function addFirstProject() {
  navigateTo('/jobs/create/projects/add')
}

function editProfile() {
  // Handle edit profile
  console.log('Edit profile clicked')
}

function previewPortfolio() {
  // Handle preview portfolio
  console.log('Preview portfolio clicked')
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 py-8 md:py-12">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/20 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-6xl">
      <!-- Header with Welcome message and actions -->
      <header class="mb-8 flex items-center justify-between md:mb-12">
        <div>
          <h1 class="text-2xl font-bold text-white md:text-3xl">
            Welcome <span class="text-primary-500">{{ userName }}</span>
          </h1>
          <p class="mt-2 max-w-md text-sm text-light-500">Here's what's happening with your talent profile today.</p>
        </div>
        <div class="flex gap-3">
          <button
            class="font-medium inline-flex items-center justify-center rounded-xl border border-white/10 bg-dark-600/80 px-5 py-3 text-sm text-white shadow-lg ring-1 ring-dark-600 transition-all hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
            @click="editProfile">
            <NuxtIcon name="solar:pen-linear" class="mr-2 size-4" />
            Edit Profile
          </button>
          <button
            class="font-medium inline-flex items-center justify-center rounded-xl border border-white/10 bg-dark-600/80 px-5 py-3 text-sm text-white shadow-lg ring-1 ring-dark-600 transition-all hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
            @click="previewPortfolio">
            <NuxtIcon name="solar:eye-linear" class="mr-2 size-4" />
            Preview Portfolio
          </button>
        </div>
      </header>

      <!-- Stats Section -->
      <section class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div class="flex items-center gap-4 rounded-xl border border-white/10 bg-dark-500/95 p-6 backdrop-blur-sm">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary-500/20">
            <NuxtIcon name="solar:eye-linear" class="size-5 text-primary-500" />
          </div>
          <div>
            <h3 class="mb-2 text-lg font-semi-bold text-white">Profile Views</h3>
            <p class="text-3xl font-bold text-primary-500">0</p>
          </div>
        </div>
        <div class="flex items-center gap-4 rounded-xl border border-white/10 bg-dark-500/95 p-6 backdrop-blur-sm">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary-500/20">
            <NuxtIcon name="solar:document-text-linear" class="size-5 text-primary-500" />
          </div>
          <div>
            <h3 class="mb-2 text-lg font-semi-bold text-white">Active Applications</h3>
            <p class="text-3xl font-bold text-primary-500">0</p>
          </div>
        </div>
        <div class="flex items-center gap-4 rounded-xl border border-white/10 bg-dark-500/95 p-6 backdrop-blur-sm">
          <div class="flex size-10 items-center justify-center rounded-full bg-primary-500/20">
            <NuxtIcon name="solar:share-linear" class="size-5 text-primary-500" />
          </div>
          <div>
            <h3 class="mb-2 text-lg font-semi-bold text-white">Profile Sharing</h3>
            <p class="text-3xl font-bold text-primary-500">0</p>
          </div>
        </div>
      </section>

      <!-- Tabs Section -->
      <section class="rounded-2xl border border-white/10 bg-dark-500/95 backdrop-blur-sm">
        <!-- Tab Navigation -->
        <div class="flex border-b border-white/10">
          <button class="font-medium flex-1 border-b-2 border-primary-500 bg-primary-500/10 px-6 py-4 text-sm text-primary-500 transition-colors" disabled>Projects</button>
          <button class="font-medium flex-1 border-b-2 border-transparent px-6 py-4 text-sm text-white transition-colors hover:border-white/20">My Jobs</button>
        </div>

        <!-- Tab Content -->
        <div class="p-8 md:p-12">
          <!-- No Projects Yet State -->
          <div class="text-center">
            <div class="mb-8">
              <div class="mx-auto mb-4 flex size-20 items-center justify-center rounded-full bg-dark-600/80">
                <NuxtIcon name="solar:folder-linear" class="size-10 text-white/60" />
              </div>
              <h2 class="mb-2 text-xl font-semi-bold text-white">No Projects Yet</h2>
              <p class="mx-auto max-w-md text-sm text-light-500">Start building your portfolio by adding your first project. Showcase your work and attract potential clients.</p>
            </div>

            <!-- Add First Project Button -->
            <button
              type="button"
              class="mx-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-8 py-4 text-base font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
              @click="addFirstProject">
              <span class="text-lg leading-none">+</span>
              Add your first project
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
