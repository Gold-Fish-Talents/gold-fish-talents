<script setup>
definePageMeta({
  layout: 'default',
})

// ============================================================
// SHARED STATS — same useState key 'talentStats' as dashboard
// Nuxt shares this state across pages automatically
// In future: replace initialValue with your API fetch
// ============================================================
const liveStats = useState('talentStats', () => ({
  profileViews: 12000,
  profileViewsChange: '+18% from the last month',
  activeApplications: 8,
  pendingResponses: 2,
  profileSharing: 24,
  sharingEngagement: '34% engagement rate',
}))

// ============================================================
// MOCK JOBS DATA — replace with your API
// ============================================================
const recommendedJobs = ref([
  {
    id: 1,
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    location: 'Mumbai',
    postedAgo: '2 days ago',
    talentNeeded: ['Model', 'Makeup Artist'],
    models: [
      { slot: 'Model 1', gender: 'Female', age: '22-27', height: '5ft 5in+', skin: 'Fair Skin' },
      { slot: 'Model 2', gender: 'Female', age: '22-27', height: '5ft 6in+', skin: 'Fair Skin' },
    ],
    description: 'Looking for a model and a makeup artist for an upcoming brand shoot. The project involves coordinated styling, on-set collaboration, and a professional production setup.',
  },
  {
    id: 2,
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    location: 'Mumbai',
    postedAgo: '2 days ago',
    talentNeeded: ['Model', 'Makeup Artist'],
    models: [
      { slot: 'Model 1', gender: 'Female', age: '22-27', height: '5ft 5in+', skin: 'Fair Skin' },
      { slot: 'Model 2', gender: 'Female', age: '22-27', height: '5ft 6in+', skin: 'Fair Skin' },
    ],
    description: 'Looking for a model and a makeup artist for an upcoming brand shoot. The project involves coordinated styling, on-set collaboration, and a professional production setup.',
  },
  {
    id: 3,
    title: 'Fashion Campaign Photo Shoot',
    brand: 'Vogue Essentials',
    location: 'Delhi',
    postedAgo: '5 days ago',
    talentNeeded: ['Model', 'Stylist'],
    models: [
      { slot: 'Model 1', gender: 'Male', age: '25-35', height: '6ft+', skin: 'Tanned Skin' },
      { slot: 'Model 2', gender: 'Female', age: '25-30', height: '5ft 8in+', skin: 'Olive Skin' },
    ],
    description: 'We are seeking a dynamic model and stylist for a vibrant fashion campaign. The shoot will focus on high-energy visuals and innovative styling techniques.',
  },
  {
    id: 4,
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    location: 'Mumbai',
    postedAgo: '2 days ago',
    talentNeeded: ['Model', 'Makeup Artist'],
    models: [
      { slot: 'Model 1', gender: 'Female', age: '22-27', height: '5ft 5in+', skin: 'Fair Skin' },
      { slot: 'Model 2', gender: 'Female', age: '22-27', height: '5ft 6in+', skin: 'Fair Skin' },
    ],
    description: 'Looking for a model and a makeup artist for an upcoming brand shoot. The project involves coordinated styling, on-set collaboration, and a professional production setup.',
  },
  {
    id: 5,
    title: 'Urban Streetwear Catalog',
    brand: 'Street Style Co.',
    location: 'Bangalore',
    postedAgo: '3 days ago',
    talentNeeded: ['Model', 'Photographer'],
    models: [
      { slot: 'Model 1', gender: 'Male', age: '20-28', height: '5ft 10in+', skin: 'Dark Skin' },
      { slot: 'Model 2', gender: 'Female', age: '20-28', height: '5ft 5in+', skin: 'Dark Skin' },
    ],
    description: "We're on the lookout for models and a photographer for an urban streetwear catalog that captures the essence of contemporary fashion trends.",
  },
  {
    id: 6,
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    location: 'Mumbai',
    postedAgo: '2 days ago',
    talentNeeded: ['Model', 'Makeup Artist'],
    models: [
      { slot: 'Model 1', gender: 'Female', age: '22-27', height: '5ft 5in+', skin: 'Fair Skin' },
      { slot: 'Model 2', gender: 'Female', age: '22-27', height: '5ft 6in+', skin: 'Fair Skin' },
    ],
    description: 'Looking for a model and a makeup artist for an upcoming brand shoot. The project involves coordinated styling, on-set collaboration, and a professional production setup.',
  },
  {
    id: 7,
    title: 'Bridal Collection Shoot',
    brand: 'Silk & Grace',
    location: 'Jaipur',
    postedAgo: '1 day ago',
    talentNeeded: ['Model', 'Makeup Artist'],
    models: [
      { slot: 'Model 1', gender: 'Female', age: '22-30', height: '5ft 5in+', skin: 'Fair Skin' },
      { slot: 'Model 2', gender: 'Female', age: '22-30', height: '5ft 4in+', skin: 'Wheatish Skin' },
    ],
    description: 'Seeking elegant models for a premium bridal collection campaign. Shoot involves traditional and contemporary bridal looks with a luxury production team.',
  },
  {
    id: 8,
    title: 'Fitness Brand Campaign',
    brand: 'PulseX Athletics',
    location: 'Hyderabad',
    postedAgo: '4 days ago',
    talentNeeded: ['Model', 'Photographer'],
    models: [
      { slot: 'Model 1', gender: 'Male', age: '22-32', height: '5ft 10in+', skin: 'Dark Skin' },
      { slot: 'Model 2', gender: 'Female', age: '22-30', height: '5ft 6in+', skin: 'Tanned Skin' },
    ],
    description: 'Looking for fit and dynamic models for a high-energy fitness campaign. The shoot will be outdoors and indoors across multiple gym and sports locations.',
  },
])

const myApplications = ref([
  {
    id: 1,
    title: 'Urban Streetwear Catalog',
    brand: 'Street Style Co.',
    location: 'Bangalore',
    status: 'Shortlisted',
    talentNeeded: ['Model', 'Photographer'],
    models: [
      { slot: 'Model 1', gender: 'Male', age: '20-28', height: '5ft 10in+', skin: 'Dark Skin' },
      { slot: 'Model 2', gender: 'Female', age: '20-28', height: '5ft 5in+', skin: 'Dark Skin' },
    ],
    description: "We're on the lookout for models and a photographer for an urban streetwear catalog that captures the essence of contemporary fashion trends.",
  },
  {
    id: 2,
    title: 'Urban Edge Collection',
    brand: 'Street Style Co.',
    location: 'Bangalore',
    status: 'Booked',
    talentNeeded: ['Model', 'Photographer'],
    models: [
      { slot: 'Model 1', gender: 'Male', age: '30-38', height: '5ft 10in+', skin: 'Dark Skin' },
      { slot: 'Model 2', gender: 'Female', age: '20-28', height: '5ft 5in+', skin: 'Dark Skin' },
    ],
    description: "We're seeking versatile models and a skilled photographer to create a captivating urban streetwear catalog that embodies the latest trends.",
  },
  {
    id: 3,
    title: 'Urban Streetwear Catalog',
    brand: 'Street Style Co.',
    location: 'Bangalore',
    status: 'Shortlisted',
    talentNeeded: ['Model', 'Photographer'],
    models: [
      { slot: 'Model 1', gender: 'Male', age: '20-28', height: '5ft 10in+', skin: 'Dark Skin' },
      { slot: 'Model 2', gender: 'Female', age: '5ft 5in+', height: '20-28', skin: 'Dark Skin' },
    ],
    description: "We're on the lookout for models and a photographer for an urban streetwear catalog that captures the essence of contemporary fashion trends.",
  },
  {
    id: 4,
    title: 'Urban Edge Collection',
    brand: 'Street Style Co.',
    location: 'Bangalore',
    status: 'Rejected',
    talentNeeded: ['Model', 'Photographer'],
    models: [
      { slot: 'Model 1', gender: 'Male', age: '20-28', height: '5ft 10in+', skin: 'Dark Skin' },
      { slot: 'Model 2', gender: 'Female', age: '20-28', height: '5ft 5in+', skin: 'Dark Skin' },
    ],
    description: "We're seeking versatile models and a skilled photographer to create a captivating urban streetwear catalog that embodies the latest trends.",
  },
])

// ── Filters & state ──────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const activeTab = ref('myjobs')
const appFilter = ref('All')
const showAllRec = ref(false)
const showAllApps = ref(false)

const appFilters = ['All', 'Pending', 'Booked']

const filteredApplications = computed(() => {
  if (appFilter.value === 'All') return myApplications.value
  if (appFilter.value === 'Pending') return myApplications.value.filter((a) => a.status === 'Shortlisted')
  if (appFilter.value === 'Booked') return myApplications.value.filter((a) => a.status === 'Booked')
  return myApplications.value
})

const displayedApplications = computed(() => (showAllApps.value ? filteredApplications.value : filteredApplications.value.slice(0, 4)))

const displayedRecommended = computed(() => (showAllRec.value ? recommendedJobs.value : recommendedJobs.value.slice(0, 4)))

// ── Status badge styling ─────────────────────────────────
const statusStyle = (status) => {
  switch (status) {
    case 'Shortlisted':
      return 'bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/30'
    case 'Booked':
      return 'bg-[#00e676]/15 text-[#00e676] border border-[#00e676]/30'
    case 'Rejected':
      return 'bg-red-500/15 text-red-400 border border-red-500/30'
    default:
      return 'bg-white/10 text-gray-300'
  }
}

// ── Gender tag colour — green as per design ─────────────
const genderStyle = () => 'bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676]'

// ── Talent tag colour — all orange as per design ────────
const talentStyle = () => 'bg-orange-500/15 text-orange-400 border border-orange-500/25'
</script>

<template>
  <div class="mx-auto min-h-screen max-w-6xl bg-[#080c18] px-6 pb-12 pt-24 text-white">
    <!-- ── Welcome Header ─────────────────────────────── -->
    <div class="mb-7">
      <h1 class="text-3xl font-bold tracking-tight">Welcome <span class="text-[#FFD700]">Aarohi</span></h1>
      <p class="text-gray-400 mt-1 text-sm">Here's what's happening with your talent profile today.</p>
    </div>

    <!-- ── Stats Cards ────────────────────────────────── -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <!-- Profile Views — Green -->
      <div class="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#111827] px-5 py-4">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00e676]/10">
          <svg class="h-5 w-5 text-[#00e676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-gray-400 mb-1 text-xs">Profile Views</p>
          <div class="flex items-end justify-between gap-2">
            <p class="text-3xl font-bold leading-none text-white">{{ liveStats.profileViews?.toLocaleString() }}</p>
            <p class="max-w-[130px] text-right text-[11px] leading-snug text-[#00e676]">{{ liveStats.profileViewsChange }}</p>
          </div>
        </div>
      </div>

      <!-- Active Applications — Yellow -->
      <div class="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#111827] px-5 py-4">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFD700]/10">
          <svg class="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-gray-400 mb-1 text-xs">Active Applications</p>
          <div class="flex items-end justify-between gap-2">
            <p class="text-3xl font-bold leading-none text-white">{{ liveStats.activeApplications }}</p>
            <p class="max-w-[130px] text-right text-[11px] leading-snug text-[#FFD700]">{{ liveStats.pendingResponses }} pending responses</p>
          </div>
        </div>
      </div>

      <!-- Profile Sharing — Sky Blue -->
      <div class="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#111827] px-5 py-4">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#38bdf8]/10">
          <svg class="h-5 w-5 text-[#38bdf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-gray-400 mb-1 text-xs">Profile Sharing</p>
          <div class="flex items-end justify-between gap-2">
            <p class="text-3xl font-bold leading-none text-white">{{ liveStats.profileSharing }}</p>
            <p class="max-w-[130px] text-right text-[11px] leading-snug text-[#38bdf8]">{{ liveStats.sharingEngagement }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Tabs + Favorites ────────────────────────────── -->
    <div class="relative mb-10 flex items-center justify-center">
      <div class="flex gap-1 rounded-full bg-white/5 p-1">
        <NuxtLink to="/talentdashboard/dashboard" class="font-medium text-gray-400 rounded-full px-5 py-1.5 text-sm transition-all duration-200 hover:text-white">Portfolio</NuxtLink>
        <NuxtLink to="/talentdashboard/myjobs" class="font-medium rounded-full bg-white px-5 py-1.5 text-sm text-black shadow transition-all duration-200">My Jobs</NuxtLink>
      </div>
      <!-- Favorites button — star icon, absolute right -->
      <button
        class="font-medium absolute right-0 flex items-center gap-2 rounded-full border border-white/20 bg-transparent px-5 py-2 text-sm text-white transition-all duration-200 hover:border-white/40 hover:bg-white/5">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Favorites
      </button>
    </div>

    <!-- ════════════════════════════════════════════════ -->
    <!--  RECOMMENDED SECTION                             -->
    <!-- ════════════════════════════════════════════════ -->
    <div class="mb-12">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-3xl font-bold text-white">Recommended</h2>
        <button class="hover:bg-gray-100 font-semibold rounded-full bg-white px-5 py-2 text-sm text-black transition-all duration-200 active:scale-95" @click="showAllRec = !showAllRec">
          {{ showAllRec ? 'Show Less' : 'View All' }}
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div v-for="job in displayedRecommended" :key="job.id" class="group flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#111827] p-5 transition-all duration-200 hover:border-white/10">
          <!-- Job Header -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1">
              <h3 class="text-sm font-bold leading-tight text-white">{{ job.title }}</h3>
              <div class="mt-1.5 flex items-center gap-2">
                <p class="text-gray-400 text-xs">
                  Brand: <span class="text-gray-300">{{ job.brand }}</span>
                </p>
              </div>
            </div>
            <div class="flex shrink-0 flex-col items-end gap-1.5">
              <div class="flex items-center gap-1.5">
                <span class="text-gray-500 text-[10px]">Posted {{ job.postedAgo }}</span>
                <button class="text-gray-400 flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-white/10 hover:text-white">
                  <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <div class="flex items-center gap-1 text-[#38bdf8]">
                <svg class="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span class="font-medium text-[11px]">{{ job.location }}</span>
              </div>
            </div>
          </div>

          <!-- Talent Needed tags -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-gray-500 text-[10px] uppercase tracking-wide">Talent Needed:</span>
            <span v-for="tag in job.talentNeeded" :key="tag" :class="['font-semibold rounded-full px-2.5 py-0.5 text-[10px]', talentStyle(tag)]">{{ tag }}</span>
          </div>

          <!-- Model Specs -->
          <div class="flex flex-col gap-2">
            <div v-for="model in job.models" :key="model.slot" class="flex flex-wrap items-center gap-2">
              <span class="text-gray-500 w-14 shrink-0 text-[10px]">{{ model.slot }}</span>
              <span :class="['font-semibold flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]', genderStyle(model.gender)]">
                <span>{{ model.gender === 'Female' ? '♀' : '♂' }}</span> {{ model.gender }}
              </span>
              <span class="flex items-center gap-1 rounded-full border border-[#00e676]/20 bg-[#00e676]/10 px-2 py-0.5 text-[10px] text-[#00e676]"> 🗓 {{ model.age }} </span>
              <span class="flex items-center gap-1 rounded-full border border-[#00e676]/20 bg-[#00e676]/10 px-2 py-0.5 text-[10px] text-[#00e676]"> 📏 {{ model.height }} </span>
              <span class="rounded-full border border-[#00e676]/20 bg-[#00e676]/10 px-2 py-0.5 text-[10px] text-[#00e676]">
                {{ model.skin }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-gray-400 line-clamp-3 text-xs leading-relaxed">{{ job.description }}</p>

          <!-- Actions -->
          <div class="mt-auto flex gap-3 pt-1">
            <button class="font-semibold flex-1 rounded-full border border-[#38bdf8]/50 py-2.5 text-xs text-[#38bdf8] transition-all duration-200 hover:border-[#38bdf8] hover:bg-[#38bdf8]/5">
              View Details
            </button>
            <button
              class="flex-1 rounded-full bg-[#FFD700] py-2.5 text-xs font-bold text-black shadow-[0_0_16px_rgba(255,215,0,0.5)] transition-all duration-200 hover:bg-[#ffe033] hover:shadow-[0_0_24px_rgba(255,215,0,0.7)] active:scale-95">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ════════════════════════════════════════════════ -->
    <!--  MY APPLICATIONS SECTION                         -->
    <!-- ════════════════════════════════════════════════ -->
    <div>
      <div class="mb-6 flex items-center justify-between">
        <h2 class="text-3xl font-bold text-white">My Applications</h2>
        <!-- Filter tabs -->
        <div class="flex gap-1 rounded-full bg-white/5 p-1">
          <button
            v-for="f in appFilters"
            :key="f"
            :class="['font-medium rounded-full px-4 py-1.5 text-xs transition-all duration-200', appFilter === f ? 'bg-white text-black shadow' : 'text-gray-400 hover:text-white']"
            @click="appFilter = f">
            {{ f }}
          </button>
        </div>
      </div>

      <div class="mb-6 grid grid-cols-2 gap-4">
        <div v-for="app in displayedApplications" :key="app.id" class="flex flex-col gap-4 rounded-2xl border border-white/5 bg-[#111827] p-5 transition-all duration-200 hover:border-white/10">
          <!-- App Header -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1">
              <div class="mb-1.5 flex items-start justify-between gap-2">
                <h3 class="text-sm font-bold leading-tight text-white">{{ app.title }}</h3>
                <span :class="['shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold', statusStyle(app.status)]">
                  {{ app.status }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-gray-400 text-xs">
                  Brand: <span class="text-gray-300">{{ app.brand }}</span>
                </p>
                <div class="flex items-center gap-1 text-[#38bdf8]">
                  <svg class="h-3 w-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span class="font-medium text-[11px]">{{ app.location }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Talent Needed -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-gray-500 text-[10px] uppercase tracking-wide">Talent Needed:</span>
            <span v-for="tag in app.talentNeeded" :key="tag" :class="['font-semibold rounded-full px-2.5 py-0.5 text-[10px]', talentStyle(tag)]">{{ tag }}</span>
          </div>

          <!-- Model Specs -->
          <div class="flex flex-col gap-2">
            <div v-for="model in app.models" :key="model.slot" class="flex flex-wrap items-center gap-2">
              <span class="text-gray-500 w-14 shrink-0 text-[10px]">{{ model.slot }}</span>
              <span :class="['font-semibold flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]', genderStyle(model.gender)]">
                <span>{{ model.gender === 'Female' ? '♀' : '♂' }}</span> {{ model.gender }}
              </span>
              <span class="flex items-center gap-1 rounded-full border border-[#00e676]/20 bg-[#00e676]/10 px-2 py-0.5 text-[10px] text-[#00e676]"> 🗓 {{ model.age }} </span>
              <span class="flex items-center gap-1 rounded-full border border-[#00e676]/20 bg-[#00e676]/10 px-2 py-0.5 text-[10px] text-[#00e676]"> 📏 {{ model.height }} </span>
              <span class="rounded-full border border-[#00e676]/20 bg-[#00e676]/10 px-2 py-0.5 text-[10px] text-[#00e676]">
                {{ model.skin }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <p class="text-gray-400 line-clamp-3 text-xs leading-relaxed">{{ app.description }}</p>

          <!-- View Details -->
          <div class="mt-auto pt-1">
            <button class="font-semibold w-full rounded-full border border-[#38bdf8]/50 py-2.5 text-xs text-[#38bdf8] transition-all duration-200 hover:border-[#38bdf8] hover:bg-[#38bdf8]/5">
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredApplications.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
        <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFD700]/10">
          <svg class="h-7 w-7 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p class="font-semibold text-white">No {{ appFilter.toLowerCase() }} applications</p>
        <p class="text-gray-500 mt-1 text-sm">Your applications with this status will appear here.</p>
      </div>

      <!-- View More -->
      <div v-if="filteredApplications.length > 4" class="mt-2 flex justify-center">
        <button
          class="font-medium rounded-full border border-white/10 bg-[#111827] px-8 py-3 text-sm text-white transition-all duration-200 hover:border-[#FFD700]/40 hover:bg-white/5"
          @click="showAllApps = !showAllApps">
          {{ showAllApps ? 'Show less' : 'View more' }}
        </button>
      </div>
    </div>
  </div>
</template>
