<script setup>
definePageMeta({
  layout: 'default',
})

// ============================================================
// SHARED STATS — useState keeps same data across all pages
// In future: replace the initialValue with your API fetch
// e.g. const data = await $fetch('/api/talent/stats')
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
// PROFILE DATA — swap with your API/Pinia/Supabase later
// ============================================================
const talent = ref({
  name: 'Aarohi Mehta',
  profession: 'Fashion Model',
  bio: "I'm Aarohi Mehta, a fashion and commercial model with a versatile look and a strong sense of visual storytelling. I bring elegance, confidence, and adaptability to every shoot, whether it's a high-fashion editorial or a clean commercial campaign. I believe modelling is about expressing emotion, not just posing.",
  avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80',
  secondPhoto: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=400&q=80',

  measurements: {
    height: '5\'7"',
    weight: '64 Kg',
    bust: '32 in',
    waist: '25 in',
    hips: '34 in',
    age: 25,
    shoeSize: 'UK 6',
    skinTone: 'Fair',
  },

  gallery: [
    { src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80', verified: true },
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80', verified: true },
    { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80', verified: true },
    { src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80', verified: false },
    { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', verified: true },
    { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', verified: false },
    { src: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80', verified: true },
    { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80', verified: false },
  ],

  projects: [
    {
      id: 1,
      title: 'Astra Motors',
      description:
        'A commercial automobile shoot focused on confidence, innovation, and realism. The visuals highlight strong presence, natural dynamism and seamless interaction with the vehicle in an urban setting.',
      category: 'Automobile Advertisement',
      location: 'Urban Outdoor',
      date: '13.03.2025',
      role: 'Lead Female Model',
      coverImage: 'https://images.unsplash.com/photo-1492446845049-9c50cc313f00?w=900&q=80',
      images: [
        'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&q=80',
        'https://images.unsplash.com/photo-1492446845049-9c50cc313f00?w=500&q=80',
      ],
    },
  ],
})

const measurementExpanded = ref(false)
const showAllGallery = ref(false)

const displayedGallery = computed(() => {
  if (showAllGallery.value) return talent.value.gallery
  return talent.value.gallery.slice(0, 4)
})

const measurementList = computed(() => {
  const m = talent.value.measurements
  return [
    { label: 'Height', value: m.height },
    { label: 'Weight', value: m.weight },
    { label: 'Bust', value: m.bust },
    { label: 'Waist', value: m.waist },
    { label: 'Hips', value: m.hips },
    { label: 'Age', value: m.age },
    { label: 'Shoe Size', value: m.shoeSize },
    { label: 'Skin Tone', value: m.skinTone },
  ]
})

const firstName = computed(() => talent.value.name.split(' ')[0])
const lastName = computed(() => talent.value.name.split(' ').slice(1).join(' '))
const featuredProject = computed(() => talent.value.projects[0])
</script>

<template>
  <div class="mx-auto min-h-screen max-w-6xl bg-[#080c18] px-6 pb-8 pt-24 text-white">
    <!-- ── Welcome Header ──────────────────────────────── -->
    <div class="mb-7">
      <h1 class="text-3xl font-bold tracking-tight">
        Welcome <span class="text-[#FFD700]">{{ firstName }}</span>
      </h1>
      <p class="text-gray-400 mt-1 text-sm">Here's what's happening with your talent profile today.</p>
    </div>

    <!-- ── Stats Cards — Real-time ───────────────────── -->
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

    <!-- ── Tabs + Share Button ─────────────────────────── -->
    <div class="relative mb-6 flex items-center justify-center">
      <!-- Tabs — NuxtLink navigation -->
      <div class="flex gap-1 rounded-full bg-white/5 p-1">
        <NuxtLink to="/talentdashboard/dashboard" class="font-medium rounded-full bg-white px-5 py-1.5 text-sm text-black shadow transition-all duration-200">Portfolio</NuxtLink>
        <NuxtLink to="/talentdashboard/myjobs" class="font-medium text-gray-400 rounded-full px-5 py-1.5 text-sm transition-all duration-200 hover:text-white">My Jobs</NuxtLink>
      </div>

      <!-- Share button — absolute right -->
      <button class="font-semibold absolute right-0 flex items-center gap-2 rounded-full bg-[#FFD700] px-5 py-2.5 text-sm text-black transition-all duration-200 hover:bg-[#ffe033] active:scale-95">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share portfolio
      </button>
    </div>

    <!-- ══════════════════════════════════════════════════ -->
    <!--  PORTFOLIO CONTENT                                  -->
    <!-- ══════════════════════════════════════════════════ -->
    <div>
      <!-- Bento Hero Grid — corner layout matching design -->
      <div class="mb-6 grid grid-cols-3 grid-rows-2 gap-3" style="height: 480px">
        <!-- Top-left: Yellow Name Card -->
        <div class="flex flex-col items-center justify-center rounded-2xl bg-[#FFD700] px-5">
          <p class="font-serif font-black text-center text-4xl italic leading-tight text-black">{{ firstName }}<br />{{ lastName }}</p>
          <div class="mt-3 rounded-full bg-black/15 px-4 py-1">
            <p class="font-semibold text-xs uppercase tracking-wider text-black/80">{{ talent.profession }}</p>
          </div>
        </div>

        <!-- Right: Main Photo spans 2 rows -->
        <div class="relative col-span-2 row-span-2 overflow-hidden rounded-2xl">
          <img :src="talent.avatar" :alt="talent.name" class="h-full w-full object-cover object-top" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <!-- Bottom-left: Second Photo -->
        <div class="overflow-hidden rounded-2xl">
          <img :src="talent.secondPhoto" :alt="talent.name" class="h-full w-full object-cover object-center" />
        </div>
      </div>

      <!-- Edit Profile -->
      <div class="mb-6">
        <NuxtLink
          to="/talentdashboard/editprofile"
          class="hover:bg-gray-100 font-semibold inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm text-black shadow-sm transition-all duration-200 active:scale-95">
          <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
          </svg>
          Edit Profile
        </NuxtLink>
      </div>

      <!-- Measurements — separate boxes with yellow left border + toggle arrow -->
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <div v-for="m in measurementList" :key="m.label" class="flex min-w-[72px] flex-col items-start rounded-xl border-l-4 border-[#FFD700] bg-[#111827] px-4 py-2.5">
          <span class="text-gray-500 text-[9px] uppercase tracking-widest">{{ m.label }}</span>
          <span class="mt-0.5 text-sm font-bold text-white">{{ m.value }}</span>
        </div>

        <!-- Arrow button toggles About section -->
        <button
          class="text-gray-400 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#111827] transition-all duration-200 hover:border-[#FFD700]/60 hover:text-[#FFD700]"
          :title="measurementExpanded ? 'Hide About' : 'Show About'"
          @click="measurementExpanded = !measurementExpanded">
          <svg :class="['h-4 w-4 transition-transform duration-300', measurementExpanded ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <!-- About — fold/unfold with smooth transition -->
      <Transition
        enter-active-class="transition-all duration-400 ease-out"
        enter-from-class="opacity-0 -translate-y-2 max-h-0"
        enter-to-class="opacity-100 translate-y-0 max-h-96"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0 max-h-96"
        leave-to-class="opacity-0 -translate-y-2 max-h-0">
        <div v-if="measurementExpanded" class="mb-8 mt-3 overflow-hidden">
          <div class="rounded-xl border-l-4 border-[#FFD700] bg-[#111827] p-5">
            <p class="mb-2 text-xs font-bold uppercase tracking-widest text-[#FFD700]">About {{ firstName }}</p>
            <p class="text-gray-300 text-sm leading-relaxed">{{ talent.bio }}</p>
          </div>
        </div>
      </Transition>

      <!-- Gallery — inside a box -->
      <div class="mb-6 rounded-2xl border border-white/5 bg-[#111827] p-5">
        <div class="mb-5 grid grid-cols-4 gap-3">
          <div v-for="(img, i) in displayedGallery" :key="i" class="group relative cursor-pointer overflow-hidden rounded-2xl" style="aspect-ratio: 3/4">
            <img :src="img.src" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/25" />
            <div v-if="img.verified" class="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#00c853] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-lg">
              <svg class="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Verified
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-2.5 text-sm text-white transition-all duration-200 hover:border-[#FFD700]/50 hover:bg-white/10"
            @click="showAllGallery = !showAllGallery">
            <span>{{ showAllGallery ? 'Show less' : 'View more in gallery' }}</span>
            <svg :class="['h-4 w-4 transition-transform duration-300', showAllGallery ? 'rotate-180' : '']" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- ── Projects — inside a box ──────────────────── -->
      <div v-if="featuredProject" class="mt-6 rounded-2xl border border-white/5 bg-[#111827] p-5 pb-6">
        <div class="mb-6 flex items-center justify-between">
          <NuxtLink
            to="/talentdashboard/myprojects"
            class="hover:bg-gray-100 font-semibold flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs text-black shadow-sm transition-all duration-200 active:scale-95">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
            </svg>
            Edit Projects
          </NuxtLink>
          <h2 class="text-2xl font-bold text-white">Projects</h2>
          <div class="w-32" />
        </div>

        <!-- Featured Project Card -->
        <div class="group relative mb-4 overflow-hidden rounded-xl" style="height: 260px">
          <img :src="featuredProject.coverImage" :alt="featuredProject.title" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          <!-- Left content -->
          <div class="absolute bottom-6 left-6 max-w-xs">
            <h3 class="mb-2 text-2xl font-bold">{{ featuredProject.title }}</h3>
            <p class="text-gray-300 line-clamp-3 text-xs leading-relaxed">{{ featuredProject.description }}</p>
          </div>

          <!-- Right detail card + More info button -->
          <div class="absolute right-5 top-5 flex flex-col items-end gap-3">
            <div class="space-y-1.5 rounded-xl border border-white/10 bg-black/55 p-4 text-xs backdrop-blur-md">
              <p>
                <span class="text-gray-400">Category: </span><span class="font-medium text-white">{{ featuredProject.category }}</span>
              </p>
              <p>
                <span class="text-gray-400">Shoot Location: </span><span class="font-medium text-white">{{ featuredProject.location }}</span>
              </p>
              <p>
                <span class="text-gray-400">Shoot Date: </span><span class="font-medium text-white">{{ featuredProject.date }}</span>
              </p>
              <p>
                <span class="text-gray-400">Model Role: </span><span class="font-medium text-white">{{ featuredProject.role }}</span>
              </p>
            </div>
            <button class="hover:bg-sky-400/10 text-sky-400 border-sky-400 rounded-full border-2 bg-transparent px-5 py-2 text-xs font-bold transition-all duration-200 active:scale-95">
              More info
            </button>
          </div>
        </div>

        <!-- Project Image Grid -->
        <div class="grid grid-cols-3 gap-3">
          <div v-for="(img, i) in featuredProject.images" :key="i" class="group cursor-pointer overflow-hidden rounded-xl" style="aspect-ratio: 4/3">
            <img :src="img" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
