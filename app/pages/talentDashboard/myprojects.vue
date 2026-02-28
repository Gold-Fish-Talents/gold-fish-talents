<script setup>
definePageMeta({
  layout: 'default',
})

// ============================================================
// MOCK DATA — replace with your API/Pinia/Supabase
// ============================================================
const projects = ref([
  {
    id: 1,
    title: 'Advertising Project for WoW Momo',
    company: 'WOW momo',
    budget: '20K',
    date: '26.05.2025',
    status: 'Under Verification',
    category: 'Food',
    budgetType: 'High Budget',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    ],
  },
  {
    id: 2,
    title: 'Advertising Project for WoW Momo',
    company: 'WOW momo',
    budget: '20K',
    date: '26.05.2025',
    status: 'Under Verification',
    category: 'Food',
    budgetType: 'High Budget',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    ],
  },
  {
    id: 3,
    title: 'Advertising Project for WoW Momo',
    company: 'WOW momo',
    budget: '20K',
    date: '26.05.2025',
    status: 'Verified',
    category: 'Food',
    budgetType: 'High Budget',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
    ],
  },
])

// ── Status badge style ───────────────────────────────────
const statusStyle = (status) => {
  switch (status) {
    case 'Verified':
      return 'bg-[#00e676]/20 text-[#00e676] border border-[#00e676]/30'
    case 'Under Verification':
      return 'bg-[#b8860b]/30 text-[#FFD700] border border-[#FFD700]/30'
    case 'Rejected':
      return 'bg-red-500/20 text-red-400 border border-red-500/30'
    default:
      return 'bg-white/10 text-gray-300'
  }
}
</script>

<template>
  <div class="mx-auto min-h-screen max-w-6xl bg-[#080c18] px-6 pb-12 pt-24 text-white">
    <!-- ── Page Header ─────────────────────────────────── -->
    <div class="mb-10 flex items-start justify-between">
      <div>
        <h1 class="font-black text-4xl tracking-tight">My <span class="text-[#FFD700]">Projects</span></h1>
        <p class="text-gray-400 font-medium mt-2 text-sm">Showcase your work and achievements</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col gap-3">
        <button
          class="flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-[#FFD700] px-7 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all duration-200 hover:bg-[#ffe033] hover:shadow-[0_0_28px_rgba(255,215,0,0.55)] active:scale-95">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Add project
        </button>
        <button class="hover:bg-gray-100 flex min-w-[200px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-black transition-all duration-200 active:scale-95">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview Portfolio
        </button>
      </div>
    </div>

    <!-- ── Projects List ───────────────────────────────── -->
    <div class="flex flex-col gap-5">
      <div v-for="project in projects" :key="project.id" class="border-white/8 flex gap-6 rounded-2xl border bg-[#0e1422] p-6 transition-all duration-200 hover:border-white/15">
        <!-- Left: Info -->
        <div class="flex min-w-0 flex-1 flex-col gap-3">
          <!-- Status + Category tags -->
          <div class="flex flex-wrap items-center gap-2">
            <span :class="['font-semibold rounded-full px-3 py-1 text-xs', statusStyle(project.status)]">
              {{ project.status }}
            </span>
            <span class="font-semibold bg-blue-500 rounded-full px-3 py-1 text-xs text-white">
              {{ project.category }}
            </span>
            <span class="font-semibold bg-blue-500 rounded-full px-3 py-1 text-xs text-white">
              {{ project.budgetType }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="text-xl font-bold leading-snug text-white">{{ project.title }}</h2>

          <!-- Company -->
          <p class="text-gray-300 text-sm">
            Company Name : <span class="font-medium text-white">{{ project.company }}</span>
          </p>

          <!-- Budget + Date -->
          <div class="flex items-center gap-8">
            <p class="text-gray-300 text-sm">
              Budget: <span class="font-semibold text-white">{{ project.budget }}</span>
            </p>
            <p class="text-gray-300 text-sm">
              Date: <span class="font-semibold text-white">{{ project.date }}</span>
            </p>
          </div>

          <!-- Edit Project Button -->
          <div class="mt-2">
            <NuxtLink
              :to="`/talentdashboard/editproject?id=${project.id}`"
              class="font-semibold flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 py-3 text-sm text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
              </svg>
              Edit Project
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Images -->
        <div class="grid shrink-0 grid-cols-3 gap-3" style="width: 520px">
          <div v-for="(img, i) in project.images" :key="i" class="group overflow-hidden rounded-xl" style="aspect-ratio: 3/4">
            <img :src="img" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
