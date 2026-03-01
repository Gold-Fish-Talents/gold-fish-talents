<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <div class="font-sans relative min-h-screen overflow-x-hidden px-6 pb-10 text-white" style="background: #0a0e27; padding-top: 120px">
    <!-- Header -->
    <header class="relative z-10 mb-6 flex items-center justify-between">
      <NuxtLink
        to="/clientDashboard"
        class="font-semibold cursor-pointer rounded-xl px-6 py-3 text-white no-underline transition-all"
        style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2)">
        ← Back to Dashboard
      </NuxtLink>
      <button class="font-semibold cursor-pointer rounded-xl px-6 py-3 text-white transition-all" style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2)">
        ✏️ Edit Job
      </button>
    </header>

    <!-- Job Title Section -->
    <section class="relative z-10 mb-8">
      <h1 class="mb-4 text-3xl font-bold text-white">{{ job.title }}</h1>
      <div class="flex flex-wrap gap-3">
        <span class="font-semibold rounded-xl px-4 py-2 text-sm" style="background: rgba(255, 215, 0, 0.2); color: #ffd700; border: 1px solid rgba(255, 215, 0, 0.3)">{{ job.brand }}</span>
        <span class="font-semibold rounded-xl px-4 py-2 text-sm" style="background: rgba(74, 222, 128, 0.2); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3)">ACTIVE</span>
        <span class="font-semibold rounded-xl px-4 py-2 text-sm" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3)">📍 {{ job.location }}</span>
        <span class="font-semibold rounded-xl px-4 py-2 text-sm" style="background: rgba(192, 132, 252, 0.2); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.3)"
          >👥 {{ applicants.length }} Applicants</span
        >
      </div>
    </section>

    <!-- Stats Section -->
    <section class="relative z-10 mb-8 grid grid-cols-4 gap-5">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="rounded-2xl p-6 text-center transition-all hover:-translate-y-0.5"
        style="background: rgba(26, 30, 62, 0.6); border: 1px solid rgba(255, 255, 255, 0.1)">
        <div class="mb-2 text-4xl font-bold text-white">{{ stat.value }}</div>
        <div class="font-medium text-sm" style="color: rgba(255, 255, 255, 0.7)">{{ stat.label }}</div>
      </div>
    </section>

    <!-- Filter Bar -->
    <section class="relative z-10 mb-8 flex flex-wrap items-center gap-6 rounded-2xl p-5" style="background: rgba(20, 25, 50, 0.7); border: 1px solid rgba(255, 255, 255, 0.1)">
      <div class="relative" style="flex: 0 0 280px">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg">🔍</span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full rounded-xl py-3 pl-10 pr-4 text-sm text-white transition-all focus:outline-none"
          style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2)" />
      </div>
      <div class="flex flex-1 flex-wrap gap-3">
        <button
          v-for="f in ['all', 'applied', 'shortlisted', 'selected', 'rejected']"
          :key="f"
          class="font-semibold cursor-pointer rounded-xl px-5 py-2.5 text-sm capitalize transition-all"
          :style="
            activeFilter === f
              ? 'background: rgba(30,35,65,0.9); border: 1px solid #facc15; color: white;'
              : 'background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8);'
          "
          @click="activeFilter = f">
          {{ f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1) }}
        </button>
      </div>
    </section>

    <!-- ===== GRID VIEW (activeFilter === 'all') ===== -->
    <section v-if="activeFilter === 'all'" class="relative z-10 mb-10 grid gap-6" style="grid-template-columns: repeat(3, 1fr)">
      <div
        v-for="applicant in filteredApplicants"
        :key="applicant.id"
        class="relative overflow-hidden rounded-2xl transition-all hover:-translate-y-1"
        style="background: rgba(20, 25, 50, 0.7); border: 1px solid rgba(255, 255, 255, 0.1)">
        <div class="absolute right-3 top-3 z-10 rounded-xl px-3 py-1 text-xs font-bold uppercase" :style="getStatusStyle(applicant.status)">{{ applicant.status }}</div>

        <div class="w-full overflow-hidden" style="height: 300px">
          <img :src="applicant.image" :alt="`${applicant.firstName} ${applicant.lastName}`" class="h-full w-full object-cover transition-transform hover:scale-105" />
        </div>

        <div class="p-5">
          <h3 class="font-semibold mb-3 text-lg text-white">{{ applicant.firstName }} {{ applicant.lastName }}</h3>
          <div class="flex flex-col gap-2">
            <!-- Category -->
            <span class="flex items-center gap-2 text-sm" style="color: rgba(255, 255, 255, 0.8)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.7">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              <span>{{ applicant.category }}</span>
            </span>
            <!-- Location -->
            <span class="flex items-center gap-2 text-sm" style="color: rgba(255, 255, 255, 0.8)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.7">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{{ applicant.location }}</span>
            </span>
            <!-- Experience -->
            <span class="flex items-center gap-2 text-sm" style="color: rgba(255, 255, 255, 0.8)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.7">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15 15" />
              </svg>
              <span>{{ applicant.experience }}</span>
            </span>
          </div>
        </div>

        <div class="flex gap-2 px-5 pb-5">
          <!-- View Portfolio — yellow pill with glow -->
          <button
            class="flex-1 cursor-pointer rounded-full border-none py-3 text-sm font-bold transition-all hover:-translate-y-0.5"
            style="background: #facc15; color: #0a0e27; box-shadow: 0 0 16px rgba(250, 204, 21, 0.4)"
            @click="viewPortfolio(applicant)">
            View Portfolio
          </button>

          <!-- Shortlist — blue border, bookmark SVG (gold when active) -->
          <button
            class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl transition-all hover:-translate-y-0.5"
            :style="
              applicant.status === 'Shortlisted' ? 'background: rgba(250,204,21,0.15); border: 1.5px solid #facc15;' : 'background: rgba(56,189,248,0.08); border: 1.5px solid rgba(56,189,248,0.6);'
            "
            title="Shortlist"
            @click="updateStatus(applicant, 'Shortlisted')">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              :stroke="applicant.status === 'Shortlisted' ? '#facc15' : '#38bdf8'"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          <!-- Delete — blue border, × SVG -->
          <button
            class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl transition-all hover:-translate-y-0.5"
            style="background: rgba(56, 189, 248, 0.08); border: 1.5px solid rgba(56, 189, 248, 0.6)"
            title="Reject"
            @click="rejectApplicant(applicant)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="filteredApplicants.length === 0" class="col-span-3 py-20 text-center" style="color: rgba(255, 255, 255, 0.6)">
        <div class="mb-4 text-6xl opacity-50">🔍</div>
        <p class="text-lg">No applicants found matching your criteria.</p>
      </div>
    </section>

    <!-- ===== LIST VIEW (applied / shortlisted / selected / rejected) ===== -->
    <section v-else class="relative z-10 mb-10 flex flex-col gap-3">
      <div
        v-for="applicant in filteredApplicants"
        :key="applicant.id"
        class="flex items-center justify-between rounded-2xl px-6 py-5 transition-all"
        style="background: rgba(15, 20, 45, 0.8); border: 1px solid rgba(255, 255, 255, 0.08)">
        <div class="flex items-center gap-4">
          <img :src="applicant.image" :alt="applicant.firstName" class="flex-shrink-0 rounded-xl object-cover" style="width: 56px; height: 56px; border: 1px solid rgba(255, 255, 255, 0.1)" />
          <div>
            <h3 class="m-0 mb-0.5 text-base font-bold text-white">{{ applicant.firstName }} {{ applicant.lastName }}</h3>
            <p class="m-0 mb-2 text-sm" style="color: rgba(255, 255, 255, 0.6)">{{ applicant.category }} with {{ applicant.experience }} experience</p>
            <span class="rounded-full px-3 py-1 text-xs font-bold" :style="getStatusStyle(applicant.status)">{{ applicant.status }}</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="font-semibold flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-all hover:-translate-y-0.5"
            style="background: transparent; border: 1px solid rgba(56, 189, 248, 0.5); color: #38bdf8"
            @click="openAvailability(applicant)">
            📅 Availability
          </button>
          <button
            v-if="applicant.status === 'Applied'"
            class="font-semibold flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-all hover:-translate-y-0.5"
            style="background: transparent; border: 1px solid rgba(255, 255, 255, 0.3); color: white"
            @click="updateStatus(applicant, 'Shortlisted')">
            📋 Shortlist
          </button>
          <button
            v-if="applicant.status === 'Shortlisted'"
            class="flex cursor-pointer items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-all hover:-translate-y-0.5"
            style="background: #facc15; border: none; color: #0a0e27"
            @click="updateStatus(applicant, 'Selected')">
            ✓ Select
          </button>
          <button
            v-if="applicant.status === 'Selected' || applicant.status === 'Rejected'"
            class="font-semibold flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-all hover:-translate-y-0.5"
            style="background: transparent; border: 1px solid rgba(255, 255, 255, 0.3); color: white"
            @click="updateStatus(applicant, 'Applied')">
            ↩ Undo
          </button>
          <button
            v-if="applicant.status !== 'Rejected'"
            class="font-semibold flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm transition-all hover:-translate-y-0.5"
            style="background: transparent; border: 1px solid rgba(248, 113, 113, 0.5); color: #f87171"
            @click="rejectApplicant(applicant)">
            ✖ Reject
          </button>
        </div>
      </div>

      <div v-if="filteredApplicants.length === 0" class="py-20 text-center" style="color: rgba(255, 255, 255, 0.6)">
        <div class="mb-4 text-6xl opacity-50">🔍</div>
        <p class="text-lg">No applicants found.</p>
      </div>
    </section>

    <!-- Portfolio Modal -->
    <PortfolioModal
      v-if="showPortfolio"
      :show="showPortfolio"
      :applicant="selectedApplicant || {}"
      @close="showPortfolio = false"
      @shortlist="
        (a) => {
          updateStatus(a, 'Shortlisted')
          showPortfolio = false
        }
      "
      @select="
        (a) => {
          updateStatus(a, 'Selected')
          showPortfolio = false
        }
      "
      @reject="rejectApplicant"
      @availability="openAvailability" />

    <!-- Availability Calendar -->
    <AvailabilityCalendar :show="showAvailability" :applicant="selectedApplicant || {}" @close="showAvailability = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PortfolioModal from '~/components/PortfolioModal.vue'
import AvailabilityCalendar from '~/components/AvailabilityCalendar.vue'

const job = ref({
  title: 'Luxury Jewellery Ad Shoot',
  brand: 'Aurora Jewels',
  location: 'Mumbai',
})

const applicants = ref([
  {
    id: 1,
    firstName: 'Olivia',
    lastName: 'Rodrigo',
    category: 'Model',
    location: 'Mumbai',
    experience: '5 years',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop',
    status: 'Applied',
    isFavorite: false,
  },
  {
    id: 2,
    firstName: 'Olivia',
    lastName: 'Rodrigo',
    category: 'Model',
    location: 'Mumbai',
    experience: '5 years',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop',
    status: 'Applied',
    isFavorite: false,
  },
  {
    id: 3,
    firstName: 'Olivia',
    lastName: 'Rodrigo',
    category: 'Model',
    location: 'Mumbai',
    experience: '5 years',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=500&fit=crop',
    status: 'Applied',
    isFavorite: false,
  },
  {
    id: 4,
    firstName: 'Olivia',
    lastName: 'Rodrigo',
    category: 'Model',
    location: 'Mumbai',
    experience: '5 years',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop',
    status: 'Applied',
    isFavorite: false,
  },
  {
    id: 5,
    firstName: 'Olivia',
    lastName: 'Rodrigo',
    category: 'Model',
    location: 'Mumbai',
    experience: '5 years',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop',
    status: 'Applied',
    isFavorite: false,
  },
  {
    id: 6,
    firstName: 'Olivia',
    lastName: 'Rodrigo',
    category: 'Model',
    location: 'Mumbai',
    experience: '5 years',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=500&fit=crop',
    status: 'Applied',
    isFavorite: false,
  },
])

const searchQuery = ref('')
const activeFilter = ref('all')
const showPortfolio = ref(false)
const showAvailability = ref(false)
const selectedApplicant = ref(null)

const stats = computed(() => [
  { label: 'Applied', value: applicants.value.length },
  { label: 'Shortlisted', value: applicants.value.filter((a) => a.status === 'Shortlisted').length },
  { label: 'Selected', value: applicants.value.filter((a) => a.status === 'Selected').length },
  { label: 'Rejected', value: applicants.value.filter((a) => a.status === 'Rejected').length },
])

const filteredApplicants = computed(() => {
  let filtered = applicants.value
  if (activeFilter.value !== 'all' && activeFilter.value !== 'applied') {
    filtered = filtered.filter((a) => a.status.toLowerCase() === activeFilter.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter((a) => `${a.firstName} ${a.lastName}`.toLowerCase().includes(q) || a.category.toLowerCase().includes(q) || a.location.toLowerCase().includes(q))
  }
  return filtered
})

const getStatusStyle = (status) => {
  const map = {
    Applied: 'background: rgba(56,189,248,0.3); color: #38bdf8; border: 1px solid rgba(56,189,248,0.5);',
    Shortlisted: 'background: rgba(250,204,21,0.3); color: #facc15; border: 1px solid rgba(250,204,21,0.5);',
    Selected: 'background: rgba(74,222,128,0.3); color: #4ade80; border: 1px solid rgba(74,222,128,0.5);',
    Rejected: 'background: rgba(248,113,113,0.3); color: #f87171; border: 1px solid rgba(248,113,113,0.5);',
  }
  return map[status] || map['Applied']
}

const updateStatus = (applicant, newStatus) => {
  const i = applicants.value.findIndex((a) => a.id === applicant.id)
  if (i !== -1) applicants.value[i].status = newStatus
}

const rejectApplicant = (applicant) => {
  if (confirm(`Reject ${applicant.firstName} ${applicant.lastName}?`)) {
    updateStatus(applicant, 'Rejected')
    showPortfolio.value = false
  }
}

const openAvailability = (applicant) => {
  selectedApplicant.value = applicant
  showAvailability.value = true
}

const viewPortfolio = (applicant) => {
  selectedApplicant.value = applicant
  showPortfolio.value = true
}

onMounted(() => {
  const savedJob = localStorage.getItem('jobData')
  if (savedJob) {
    try {
      job.value = JSON.parse(savedJob)
    } catch {
      console.warn('Failed to load job data from localStorage')
    }
  }
  const savedApplicants = localStorage.getItem('applicantsData')
  if (savedApplicants) {
    try {
      const loaded = JSON.parse(savedApplicants)
      if (loaded && loaded.length > 0) applicants.value = loaded
    } catch {
      console.warn()
    }
  }
})

watch(
  applicants,
  (newVal) => {
    localStorage.setItem('applicantsData', JSON.stringify(newVal))
    const jobId = localStorage.getItem('selectedJobId')
    if (jobId) {
      const store = JSON.parse(localStorage.getItem('applicantsStore') || '{}')
      store[jobId] = newVal
      localStorage.setItem('applicantsStore', JSON.stringify(store))
    }
  },
  { deep: true }
)
</script>
