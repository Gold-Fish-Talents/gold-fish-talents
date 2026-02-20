<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Jobs | Gold Fish Talents',
  description: 'Browse and apply to curated creative jobs.',
})

type JobTab = 'all' | 'saved' | 'applied'

interface ModelRequirement {
  gender: string
  ageRange: string
  height: string
  skinTone: string
}

interface JobCard {
  id: string
  title: string
  brand: string
  location: string
  posted: string
  talentNeeded: string[]
  modelRequirements: ModelRequirement[]
  description: string
  isSaved: boolean
  isApplied: boolean
}

const allJobs = ref<JobCard[]>([
  {
    id: 'job-1',
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    location: 'Mumbai',
    posted: 'Posted 2 days ago',
    talentNeeded: ['Model', 'Makeup Artist'],
    modelRequirements: [
      { gender: 'Female', ageRange: '22-27', height: '5 ft 6in +', skinTone: 'Fair Skin' },
      { gender: 'Female', ageRange: '22-27', height: '5 ft 6in +', skinTone: 'Fair Skin' },
    ],
    description: 'Looking for a model and a makeup artist for an upcoming brand shoot. The project involves coordinated styling, on-set collaboration, and a professional production setup.',
    isSaved: false,
    isApplied: false,
  },
  {
    id: 'job-2',
    title: 'Urban Streetwear Catalog',
    brand: 'Street Style Co.',
    location: 'Bangalore',
    posted: 'Posted 1 day ago',
    talentNeeded: ['Model', 'Actor'],
    modelRequirements: [{ gender: 'Male', ageRange: '25-30', height: '5 ft 8in +', skinTone: 'Any' }],
    description: 'Seeking a dynamic model and actor for our latest streetwear collection. Must have experience in fashion photography and be comfortable with urban styling.',
    isSaved: true,
    isApplied: false,
  },
  {
    id: 'job-3',
    title: 'Beauty & Skincare Campaign',
    brand: 'Glow Naturals',
    location: 'Mumbai',
    posted: 'Posted 3 days ago',
    talentNeeded: ['Model', 'Makeup Artist'],
    modelRequirements: [{ gender: 'Female', ageRange: '20-25', height: '5 ft 5in +', skinTone: 'Fair Skin' }],
    description: 'Looking for a fresh-faced model and skilled makeup artist for our new skincare line campaign. Experience in beauty photography preferred.',
    isSaved: false,
    isApplied: true,
  },
  {
    id: 'job-4',
    title: 'Food & Beverage Commercial',
    brand: 'Spice Kitchen',
    location: 'Chennai',
    posted: 'Posted 5 days ago',
    talentNeeded: ['Model', 'Voice over artist'],
    modelRequirements: [{ gender: 'Any', ageRange: '25-35', height: 'Any', skinTone: 'Any' }],
    description: 'Seeking a versatile model and voice artist for our food commercial. Must be comfortable with on-camera eating and have a warm, inviting voice.',
    isSaved: false,
    isApplied: false,
  },
  {
    id: 'job-5',
    title: 'Fashion Week Runway Show',
    brand: 'Elite Fashion House',
    location: 'Delhi',
    posted: 'Posted 4 days ago',
    talentNeeded: ['Model'],
    modelRequirements: [
      { gender: 'Female', ageRange: '18-25', height: '5 ft 7in +', skinTone: 'Any' },
      { gender: 'Male', ageRange: '20-28', height: '5 ft 10in +', skinTone: 'Any' },
    ],
    description: 'High-profile runway show seeking professional models with runway experience. Must be available for fittings and rehearsals.',
    isSaved: true,
    isApplied: false,
  },
  {
    id: 'job-6',
    title: 'Music Video Production',
    brand: 'SoundWave Records',
    location: 'Mumbai',
    posted: 'Posted 6 days ago',
    talentNeeded: ['Actor', 'Model'],
    modelRequirements: [{ gender: 'Any', ageRange: '22-30', height: 'Any', skinTone: 'Any' }],
    description: 'Music video shoot requiring actors and models who can dance and perform. Must be comfortable with choreography and long shooting hours.',
    isSaved: false,
    isApplied: true,
  },
])

const activeTab = ref<JobTab>('all')
const savedJobs = computed(() => allJobs.value.filter((job) => job.isSaved))
const appliedJobs = computed(() => allJobs.value.filter((job) => job.isApplied))

const displayedJobs = computed(() => {
  switch (activeTab.value) {
    case 'saved':
      return savedJobs.value
    case 'applied':
      return appliedJobs.value
    default:
      return allJobs.value
  }
})

const toggleSave = (jobId: string) => {
  const job = allJobs.value.find((j) => j.id === jobId)
  if (job) {
    job.isSaved = !job.isSaved
  }
}

const searchQuery = ref('')
const showFilters = ref(false)
const activeFilterCategory = ref<'talent' | 'location' | 'gender' | 'age' | 'date'>('talent')
const categorySearchQuery = ref('')

// Filter categories
const filterCategories = [
  { id: 'talent', label: 'Talent Category' },
  { id: 'location', label: 'Location' },
  { id: 'gender', label: 'Gender Requirement' },
  { id: 'age', label: 'Age Range' },
  { id: 'date', label: 'Posted Date' },
]

// Talent categories
const talentCategories = ['Actor', 'Model', 'Makeup Artist', 'Media Composer', 'Voice over artist']
const selectedTalentCategories = ref<string[]>(['Model', 'Makeup Artist'])

// Location options
const locations = ['Mumbai', 'Bangalore', 'Chennai', 'Delhi', 'Hyderabad', 'Pune']
const selectedLocations = ref<string[]>([])

// Gender options
const genderOptions = ['Male', 'Female', 'Any']
const selectedGenders = ref<string[]>([])

// Age range options
const ageRanges = ['18-25', '22-27', '25-30', '30-35', '35+']
const selectedAgeRanges = ref<string[]>([])

// Posted date options
const dateOptions = ['Today', 'Last 3 days', 'Last week', 'Last month']
const selectedDates = ref<string[]>([])

const getSelectedCount = (category: string) => {
  switch (category) {
    case 'talent':
      return selectedTalentCategories.value.length
    case 'location':
      return selectedLocations.value.length
    case 'gender':
      return selectedGenders.value.length
    case 'age':
      return selectedAgeRanges.value.length
    case 'date':
      return selectedDates.value.length
    default:
      return 0
  }
}

const toggleTalentCategory = (category: string) => {
  const index = selectedTalentCategories.value.indexOf(category)
  if (index > -1) {
    selectedTalentCategories.value.splice(index, 1)
  } else {
    selectedTalentCategories.value.push(category)
  }
}

const toggleLocation = (location: string) => {
  const index = selectedLocations.value.indexOf(location)
  if (index > -1) {
    selectedLocations.value.splice(index, 1)
  } else {
    selectedLocations.value.push(location)
  }
}

const toggleGender = (gender: string) => {
  const index = selectedGenders.value.indexOf(gender)
  if (index > -1) {
    selectedGenders.value.splice(index, 1)
  } else {
    selectedGenders.value.push(gender)
  }
}

const toggleAgeRange = (age: string) => {
  const index = selectedAgeRanges.value.indexOf(age)
  if (index > -1) {
    selectedAgeRanges.value.splice(index, 1)
  } else {
    selectedAgeRanges.value.push(age)
  }
}

const toggleDate = (date: string) => {
  const index = selectedDates.value.indexOf(date)
  if (index > -1) {
    selectedDates.value.splice(index, 1)
  } else {
    selectedDates.value.push(date)
  }
}

const clearAllFilters = () => {
  selectedTalentCategories.value = []
  selectedLocations.value = []
  selectedGenders.value = []
  selectedAgeRanges.value = []
  selectedDates.value = []
}

const clearCurrentCategory = () => {
  switch (activeFilterCategory.value) {
    case 'talent':
      selectedTalentCategories.value = []
      break
    case 'location':
      selectedLocations.value = []
      break
    case 'gender':
      selectedGenders.value = []
      break
    case 'age':
      selectedAgeRanges.value = []
      break
    case 'date':
      selectedDates.value = []
      break
  }
}

const filteredTalentCategories = computed(() => {
  if (!categorySearchQuery.value) return talentCategories
  return talentCategories.filter((cat) => cat.toLowerCase().includes(categorySearchQuery.value.toLowerCase()))
})

// Clear category search when switching categories
watch(activeFilterCategory, () => {
  categorySearchQuery.value = ''
})
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-10 pt-28 md:pt-32">
    <!-- Cosmic background -->
    <div
      class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(80,80,120,0.6)_0,_transparent_45%),radial-gradient(circle_at_bottom,_rgba(40,40,80,0.7)_0,_#020617_55%)]"
      aria-hidden="true" />

    <div class="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <!-- Header row: title + quick actions -->
      <header class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 class="text-3xl font-bold text-white md:text-4xl">Jobs</h1>
        </div>
        <div class="bg-slate-900/70 flex items-center gap-3 rounded-full px-2 py-2 ring-1 ring-white/10 backdrop-blur">
          <button
            type="button"
            class="font-medium rounded-full px-4 py-2 text-xs transition-colors md:text-sm"
            :class="activeTab === 'all' ? 'bg-primary-500 text-black shadow-md shadow-primary-500/40' : 'text-white/70 hover:text-white'"
            @click="activeTab = 'all'">
            All Jobs
          </button>
          <button
            type="button"
            class="font-medium rounded-full px-4 py-2 text-xs transition-colors md:text-sm"
            :class="activeTab === 'saved' ? 'bg-primary-500 text-black shadow-md shadow-primary-500/40' : 'text-white/70 hover:text-white'"
            @click="activeTab = 'saved'">
            Saved
          </button>
          <button
            type="button"
            class="font-medium rounded-full px-4 py-2 text-xs transition-colors md:text-sm"
            :class="activeTab === 'applied' ? 'bg-primary-500 text-black shadow-md shadow-primary-500/40' : 'text-white/70 hover:text-white'"
            @click="activeTab = 'applied'">
            Applied
          </button>
        </div>
      </header>

      <!-- Search and Filters -->
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <!-- Search Bar -->
        <div class="relative flex-1">
          <div class="bg-slate-900/70 flex items-center rounded-full border border-white/10 px-4 py-3 ring-1 ring-white/10 backdrop-blur">
            <NuxtIcon name="local:search" class="mr-3 text-xl text-white/70" />
            <input v-model="searchQuery" type="text" placeholder="Search Jobs" class="flex-1 bg-transparent text-white placeholder:text-white/50 focus:outline-none" />
          </div>
        </div>
        <!-- Filters Button -->
        <button
          type="button"
          class="bg-slate-900/70 hover:bg-slate-800/70 flex items-center gap-2 rounded-lg border border-white/10 px-4 py-3 ring-1 ring-white/10 backdrop-blur transition-colors"
          @click="showFilters = !showFilters">
          <NuxtIcon name="local:slider" class="text-lg text-white/70" />
          <span class="font-medium text-sm text-white">Filters</span>
        </button>
      </div>

      <!-- Main content: Jobs list -->
      <div class="relative">
        <!-- Backdrop Overlay -->
        <Transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <div v-if="showFilters" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" @click="showFilters = false"></div>
        </Transition>

        <!-- Jobs Grid -->
        <section class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article
            v-for="job in displayedJobs"
            :key="job.id"
            class="bg-slate-900/70 ring-slate-800/80 group relative rounded-2xl border border-white/10 p-6 shadow-xl ring-1 backdrop-blur-md transition hover:-translate-y-0.5 hover:border-primary-500/60 hover:ring-primary-500/50">
            <!-- Bookmark Icon -->
            <button type="button" class="hover:bg-slate-800/50 absolute right-4 top-4 z-10 rounded-lg p-2 transition-colors" @click.stop="toggleSave(job.id)">
              <NuxtIcon name="local:love" class="text-xl transition-colors" :class="job.isSaved ? 'text-primary-500' : 'text-white/50'" />
            </button>

            <!-- Job Header -->
            <div class="mb-4 flex items-start justify-between pr-10">
              <div class="flex-1">
                <h2 class="text-xl font-bold text-white">
                  {{ job.title }}
                </h2>
                <p class="mt-1 text-sm text-white/60">
                  {{ job.posted }}
                </p>
              </div>
            </div>

            <!-- Brand and Location -->
            <div class="mb-4 space-y-2">
              <p class="font-medium text-primary-300 text-sm">Brand: {{ job.brand }}</p>
              <div class="flex items-center gap-2 text-sm text-white/70">
                <span class="text-base">📍</span>
                <span>{{ job.location }}</span>
              </div>
            </div>

            <!-- Talent Needed -->
            <div class="mb-4">
              <p class="font-medium mb-2 text-xs text-white/70">Talent Needed:</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="talent in job.talentNeeded" :key="talent" class="bg-slate-800/90 font-medium text-primary-200 rounded-full px-3 py-1 text-xs">
                  {{ talent }}
                </span>
              </div>
            </div>

            <!-- Model Requirements -->
            <div class="mb-4 space-y-3">
              <div v-for="(requirement, index) in job.modelRequirements" :key="index" class="space-y-2">
                <p class="font-medium text-xs text-white/70">Model {{ index + 1 }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-if="requirement.gender !== 'Any'" class="bg-emerald-500/20 font-medium text-emerald-300 rounded-full px-3 py-1 text-xs">
                    {{ requirement.gender }}
                  </span>
                  <span v-if="requirement.ageRange" class="bg-emerald-500/20 font-medium text-emerald-300 rounded-full px-3 py-1 text-xs">
                    {{ requirement.ageRange }}
                  </span>
                  <span v-if="requirement.height !== 'Any'" class="bg-emerald-500/20 font-medium text-emerald-300 rounded-full px-3 py-1 text-xs">
                    {{ requirement.height }}
                  </span>
                  <span v-if="requirement.skinTone !== 'Any'" class="bg-emerald-500/20 font-medium text-emerald-300 rounded-full px-3 py-1 text-xs">
                    {{ requirement.skinTone }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="mb-6 text-sm leading-relaxed text-white/70">
              {{ job.description }}
            </p>

            <!-- Action Buttons -->
            <div class="flex gap-3 border-t border-white/10 pt-4">
              <NuxtLink
                :to="`/jobs/${job.id}`"
                class="font-medium flex-1 rounded-full border border-primary-500/50 bg-transparent px-6 py-2.5 text-center text-sm text-primary-400 transition-colors hover:bg-primary-500/10">
                View Details
              </NuxtLink>
              <NuxtLink
                :to="`/jobs/${job.id}/apply`"
                class="flex-1 rounded-full bg-primary-500 px-6 py-2.5 text-center text-sm font-semi-bold text-black shadow-lg shadow-primary-500/40 transition-colors hover:bg-primary-400">
                Apply
              </NuxtLink>
            </div>
          </article>
        </section>

        <!-- Filter Panel Overlay -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-x-full"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-full">
          <aside v-if="showFilters" class="fixed right-4 top-32 z-50 hidden max-h-[calc(100vh-10rem)] w-[520px] overflow-y-auto lg:block">
            <div class="bg-slate-900/95 ring-slate-800/80 rounded-2xl border border-white/10 p-6 shadow-2xl ring-1 backdrop-blur-xl">
              <!-- Close Button -->
              <button class="hover:bg-slate-800/50 absolute right-4 top-4 z-10 rounded-lg p-1.5 text-white/70 transition-colors hover:text-white" @click="showFilters = false">
                <NuxtIcon name="local:cross" class="text-lg" />
              </button>

              <div class="grid grid-cols-[220px_1fr] gap-6 pr-2">
                <!-- Left: Filter Categories -->
                <div class="flex flex-col gap-2">
                  <div
                    v-for="category in filterCategories"
                    :key="category.id"
                    class="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-colors"
                    :class="activeFilterCategory === category.id ? 'bg-slate-800/90 text-white' : 'hover:bg-slate-800/50 text-white/70 hover:text-white'"
                    @click="activeFilterCategory = category.id as any">
                    <div class="flex min-w-0 items-center gap-3">
                      <div class="h-6 w-1 shrink-0 rounded-full transition-colors" :class="activeFilterCategory === category.id ? 'bg-primary-500' : 'bg-transparent'"></div>
                      <span class="font-medium truncate text-sm">{{ category.label }}</span>
                    </div>
                    <span v-if="getSelectedCount(category.id) > 0" class="font-semibold ml-2 shrink-0 rounded-full bg-primary-500 px-2 py-0.5 text-xs text-black">
                      {{ getSelectedCount(category.id) }}
                    </span>
                  </div>
                  <button class="mt-2 text-left text-sm text-white/70 transition-colors hover:text-white" @click="clearAllFilters">Clear All</button>
                </div>

                <!-- Right: Filter Options -->
                <div class="flex min-w-0 flex-col gap-5">
                  <!-- Search within category -->
                  <div class="relative">
                    <div class="bg-slate-800/50 flex items-center rounded-lg border border-white/10 px-4 py-3">
                      <NuxtIcon name="local:search" class="mr-3 text-base text-white/50" />
                      <input v-model="categorySearchQuery" type="text" placeholder="Search category" class="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none" />
                    </div>
                  </div>

                  <!-- Talent Category Options -->
                  <div v-if="activeFilterCategory === 'talent'" class="flex flex-col gap-3">
                    <label v-for="talent in filteredTalentCategories" :key="talent" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                      <input
                        type="checkbox"
                        :checked="selectedTalentCategories.includes(talent)"
                        class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                        @change="toggleTalentCategory(talent)" />
                      <span class="text-sm text-white">{{ talent }}</span>
                    </label>
                  </div>

                  <!-- Location Options -->
                  <div v-if="activeFilterCategory === 'location'" class="flex flex-col gap-3">
                    <label v-for="location in locations" :key="location" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                      <input
                        type="checkbox"
                        :checked="selectedLocations.includes(location)"
                        class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                        @change="toggleLocation(location)" />
                      <span class="text-sm text-white">{{ location }}</span>
                    </label>
                  </div>

                  <!-- Gender Options -->
                  <div v-if="activeFilterCategory === 'gender'" class="flex flex-col gap-3">
                    <label v-for="gender in genderOptions" :key="gender" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                      <input
                        type="checkbox"
                        :checked="selectedGenders.includes(gender)"
                        class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                        @change="toggleGender(gender)" />
                      <span class="text-sm text-white">{{ gender }}</span>
                    </label>
                  </div>

                  <!-- Age Range Options -->
                  <div v-if="activeFilterCategory === 'age'" class="flex flex-col gap-3">
                    <label v-for="age in ageRanges" :key="age" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                      <input
                        type="checkbox"
                        :checked="selectedAgeRanges.includes(age)"
                        class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                        @change="toggleAgeRange(age)" />
                      <span class="text-sm text-white">{{ age }}</span>
                    </label>
                  </div>

                  <!-- Posted Date Options -->
                  <div v-if="activeFilterCategory === 'date'" class="flex flex-col gap-3">
                    <label v-for="date in dateOptions" :key="date" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                      <input
                        type="checkbox"
                        :checked="selectedDates.includes(date)"
                        class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                        @change="toggleDate(date)" />
                      <span class="text-sm text-white">{{ date }}</span>
                    </label>
                  </div>

                  <!-- Clear button for current category -->
                  <button class="mt-auto text-left text-sm text-white/70 transition-colors hover:text-white" @click="clearCurrentCategory">Clear</button>
                </div>
              </div>
            </div>
          </aside>
        </Transition>

        <!-- Mobile Filter Panel -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4">
          <div
            v-if="showFilters"
            class="bg-slate-900/95 ring-slate-800/80 fixed inset-x-4 top-32 z-50 max-h-[calc(100vh-10rem)] overflow-y-auto rounded-2xl border border-white/10 p-6 shadow-2xl ring-1 backdrop-blur-xl lg:hidden">
            <!-- Close Button -->
            <button class="hover:bg-slate-800/50 absolute right-4 top-4 rounded-lg p-1.5 text-white/70 transition-colors hover:text-white" @click="showFilters = false">
              <NuxtIcon name="local:cross" class="text-lg" />
            </button>

            <div class="grid grid-cols-1 gap-6 pr-2 md:grid-cols-[220px_1fr]">
              <!-- Left: Filter Categories -->
              <div class="flex flex-col gap-2">
                <div
                  v-for="category in filterCategories"
                  :key="category.id"
                  class="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-3 transition-colors"
                  :class="activeFilterCategory === category.id ? 'bg-slate-800/90 text-white' : 'hover:bg-slate-800/50 text-white/70 hover:text-white'"
                  @click="activeFilterCategory = category.id as any">
                  <div class="flex min-w-0 items-center gap-3">
                    <div class="h-6 w-1 shrink-0 rounded-full transition-colors" :class="activeFilterCategory === category.id ? 'bg-primary-500' : 'bg-transparent'"></div>
                    <span class="font-medium truncate text-sm">{{ category.label }}</span>
                  </div>
                  <span v-if="getSelectedCount(category.id) > 0" class="font-semibold ml-2 shrink-0 rounded-full bg-primary-500 px-2 py-0.5 text-xs text-black">
                    {{ getSelectedCount(category.id) }}
                  </span>
                </div>
                <button class="mt-2 text-left text-sm text-white/70 transition-colors hover:text-white" @click="clearAllFilters">Clear All</button>
              </div>

              <!-- Right: Filter Options -->
              <div class="flex min-w-0 flex-col gap-5">
                <!-- Search within category -->
                <div class="relative">
                  <div class="bg-slate-800/50 flex items-center rounded-lg border border-white/10 px-4 py-3">
                    <NuxtIcon name="local:search" class="mr-3 text-base text-white/50" />
                    <input v-model="categorySearchQuery" type="text" placeholder="Search category" class="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none" />
                  </div>
                </div>

                <!-- Talent Category Options -->
                <div v-if="activeFilterCategory === 'talent'" class="flex flex-col gap-3">
                  <label v-for="talent in filteredTalentCategories" :key="talent" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                    <input
                      type="checkbox"
                      :checked="selectedTalentCategories.includes(talent)"
                      class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                      @change="toggleTalentCategory(talent)" />
                    <span class="text-sm text-white">{{ talent }}</span>
                  </label>
                </div>

                <!-- Location Options -->
                <div v-if="activeFilterCategory === 'location'" class="flex flex-col gap-3">
                  <label v-for="location in locations" :key="location" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                    <input
                      type="checkbox"
                      :checked="selectedLocations.includes(location)"
                      class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                      @change="toggleLocation(location)" />
                    <span class="text-sm text-white">{{ location }}</span>
                  </label>
                </div>

                <!-- Gender Options -->
                <div v-if="activeFilterCategory === 'gender'" class="flex flex-col gap-3">
                  <label v-for="gender in genderOptions" :key="gender" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                    <input
                      type="checkbox"
                      :checked="selectedGenders.includes(gender)"
                      class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                      @change="toggleGender(gender)" />
                    <span class="text-sm text-white">{{ gender }}</span>
                  </label>
                </div>

                <!-- Age Range Options -->
                <div v-if="activeFilterCategory === 'age'" class="flex flex-col gap-3">
                  <label v-for="age in ageRanges" :key="age" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                    <input
                      type="checkbox"
                      :checked="selectedAgeRanges.includes(age)"
                      class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                      @change="toggleAgeRange(age)" />
                    <span class="text-sm text-white">{{ age }}</span>
                  </label>
                </div>

                <!-- Posted Date Options -->
                <div v-if="activeFilterCategory === 'date'" class="flex flex-col gap-3">
                  <label v-for="date in dateOptions" :key="date" class="hover:bg-slate-800/50 flex cursor-pointer items-center gap-4 rounded-lg px-3 py-3 transition-colors">
                    <input
                      type="checkbox"
                      :checked="selectedDates.includes(date)"
                      class="bg-slate-800 h-5 w-5 shrink-0 cursor-pointer rounded border-white/20 text-primary-500 focus:ring-primary-500 focus:ring-offset-0"
                      @change="toggleDate(date)" />
                    <span class="text-sm text-white">{{ date }}</span>
                  </label>
                </div>

                <!-- Clear button for current category -->
                <button class="mt-auto text-left text-sm text-white/70 transition-colors hover:text-white" @click="clearCurrentCategory">Clear</button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </main>
</template>
