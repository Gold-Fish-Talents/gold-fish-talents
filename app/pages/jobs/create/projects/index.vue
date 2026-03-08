<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Talent Profile | Gold Fish Talents',
  description: "Here's what's happening with your talent profile today.",
})

const route = useRoute()
const talentType = computed(() => (route.query.type as string) || 'talent')

type SubmittedProject = {
  id: string
  title: string
  companyName: string
  budget: string
  date: string
  status: 'Under Verification' | 'Verified'
  tags: string[]
  media?: { name: string; type: string; url: string }[]
}

const projects = useState<SubmittedProject[]>('job-projects', () => [])
const { user: sessionUser } = useUserSession()
const displayName = computed(() => sessionUser.value?.name || 'User')

// Mock data for dashboard when no projects yet (matches design)
const mockStats = {
  profileViews: 0,
  activeApplications: 0,
  profileSharing: 0,
}

const mockProjects: SubmittedProject[] = [
  {
    id: 'mock-1',
    title: 'Advertising Project for WoW Momo',
    companyName: 'WOW momo',
    budget: '20K',
    date: '26.05.2025',
    status: 'Under Verification',
    tags: ['Food', 'High Budget'],
    media: [
      { name: 'img1', type: 'image/jpeg', url: 'https://picsum.photos/seed/wowmomo1/400/280' },
      { name: 'img2', type: 'image/jpeg', url: 'https://picsum.photos/seed/wowmomo2/400/280' },
      { name: 'img3', type: 'image/jpeg', url: 'https://picsum.photos/seed/wowmomo3/400/280' },
    ],
  },
  {
    id: 'mock-2',
    title: 'Advertising Project for WoW Momo',
    companyName: 'WOW momo',
    budget: '20K',
    date: '26.05.2025',
    status: 'Under Verification',
    tags: ['Food', 'High Budget'],
    media: [
      { name: 'img1', type: 'image/jpeg', url: 'https://picsum.photos/seed/food1/400/280' },
      { name: 'img2', type: 'image/jpeg', url: 'https://picsum.photos/seed/food2/400/280' },
      { name: 'img3', type: 'image/jpeg', url: 'https://picsum.photos/seed/food3/400/280' },
    ],
  },
  {
    id: 'mock-3',
    title: 'Advertising Project for WoW Momo',
    companyName: 'WOW momo',
    budget: '20K',
    date: '26.05.2025',
    status: 'Verified',
    tags: ['Food', 'High Budget'],
    media: [
      { name: 'img1', type: 'image/jpeg', url: 'https://picsum.photos/seed/brand1/400/280' },
      { name: 'img2', type: 'image/jpeg', url: 'https://picsum.photos/seed/brand2/400/280' },
      { name: 'img3', type: 'image/jpeg', url: 'https://picsum.photos/seed/brand3/400/280' },
    ],
  },
]

const displayProjects = computed(() => (projects.value.length > 0 ? projects.value : mockProjects))

const addProjectRoute = computed(() => ({
  path: '/jobs/create/projects/add',
  query: { type: talentType.value },
}))

type TabId = 'projects' | 'myjobs'
const activeTab = ref<TabId>('projects')

function setTab(tab: TabId) {
  activeTab.value = tab
}

function onPreviewProfile() {
  // Placeholder: open profile preview
}

function onEditProfile() {
  // Placeholder: navigate to edit profile
}

function onEditProject(_p: SubmittedProject) {
  // Placeholder: edit project
}

// My Jobs: Recommended & My Applications (mock data)
type RecommendedJob = {
  id: string
  image: string
  title: string
  brand: string
  talentTags: string[]
  posted: string
  location: string
  requirementPills: string[]
  description: string
}

type MyApplication = {
  id: string
  image: string
  title: string
  brand: string
  talentTags: string[]
  location: string
  status: 'Pending' | 'Shortlisted' | 'Boosted' | 'Booked'
  requirementPills: string[]
  description: string
}

const mockRecommendedJobs: RecommendedJob[] = [
  {
    id: 'rec-1',
    image: 'https://picsum.photos/seed/jewel1/600/340',
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    talentTags: ['Model', 'Makeup Artist'],
    posted: 'Posted 2 days ago',
    location: 'Mumbai',
    requirementPills: ['Female', '25-30', '5-10 yrs+', 'Fair Skin'],
    description: 'High-end jewellery campaign for festive season. Looking for experienced models and makeup artists for a 2-day shoot.',
  },
  {
    id: 'rec-2',
    image: 'https://picsum.photos/seed/fashion1/600/340',
    title: 'Fashion Campaign Photo Shoot',
    brand: 'Junglee Essentials',
    talentTags: ['Model', 'Photographer', 'Stylist'],
    posted: 'Posted 1 day ago',
    location: 'Bangalore',
    requirementPills: ['Female', '20-25', '0-5 yrs+', 'Other Skills'],
    description: 'Urban streetwear catalog. Collaborative team needed for a week-long campaign in Bangalore.',
  },
  {
    id: 'rec-3',
    image: 'https://picsum.photos/seed/street1/600/340',
    title: 'Urban Streetwear Catalog',
    brand: 'Street Style Co.',
    talentTags: ['Model', 'Photographer'],
    posted: 'Posted 3 days ago',
    location: 'Delhi',
    requirementPills: ['Male', '25-30', '5-10 yrs+', 'Dark Skin'],
    description: 'Seasonal catalog for streetwear brand. Models and photographers with portfolio preferred.',
  },
  {
    id: 'rec-4',
    image: 'https://picsum.photos/seed/beauty1/600/340',
    title: 'Beauty & Skincare Campaign',
    brand: 'Glow Naturals',
    talentTags: ['Model', 'Makeup Artist'],
    posted: 'Posted 5 days ago',
    location: 'Mumbai',
    requirementPills: ['Female', '20-25', '0-5 yrs+', 'Fair Skin'],
    description: 'Skincare brand looking for fresh faces and skilled makeup artists for digital campaign.',
  },
  {
    id: 'rec-5',
    image: 'https://picsum.photos/seed/food2/600/340',
    title: 'Food & Beverage Commercial',
    brand: 'Spice Kitchen',
    talentTags: ['Model', 'Voice Artist'],
    posted: 'Posted 1 week ago',
    location: 'Chennai',
    requirementPills: ['Any', '25-35', '5-10 yrs+', 'Cooks More'],
    description: 'TV commercial and social content. Need on-camera talent and voice-over for regional rollout.',
  },
  {
    id: 'rec-6',
    image: 'https://picsum.photos/seed/tech1/600/340',
    title: 'Tech Product Launch Video',
    brand: 'NextGen Devices',
    talentTags: ['Model', 'Voice Artist', 'Composer'],
    posted: 'Posted 4 days ago',
    location: 'Bangalore',
    requirementPills: ['Male', '30-35', '5-10 yrs+', 'Other Skills'],
    description: 'Product launch video and event presence. Multiple roles for a tech brand campaign.',
  },
]

const mockMyApplications: MyApplication[] = [
  {
    id: 'app-1',
    image: 'https://picsum.photos/seed/app1/600/340',
    title: 'Urban Streetwear Catalog',
    brand: 'Street Style Co.',
    talentTags: ['Model', 'Photographer'],
    location: 'Bangalore',
    status: 'Shortlisted',
    requirementPills: ['Female', '20-25', '0-5 yrs+', 'Dark Skin'],
    description: 'Seasonal catalog shoot. You have been shortlisted for the final round.',
  },
  {
    id: 'app-2',
    image: 'https://picsum.photos/seed/app2/600/340',
    title: 'Urban Edge Collection',
    brand: 'Street Style Co.',
    talentTags: ['Model'],
    location: 'Bangalore',
    status: 'Booked',
    requirementPills: ['Female', '25-30', '5-10 yrs+', 'Fair Skin'],
    description: 'Edgy urban collection. Your application has been accepted. Check details for shoot dates.',
  },
  {
    id: 'app-3',
    image: 'https://picsum.photos/seed/app3/600/340',
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    talentTags: ['Model', 'Makeup Artist'],
    location: 'Mumbai',
    status: 'Pending',
    requirementPills: ['Female', '25-30', '5-10 yrs+', 'Fair Skin'],
    description: 'High-end jewellery campaign. Your application is under review.',
  },
  {
    id: 'app-4',
    image: 'https://picsum.photos/seed/app4/600/340',
    title: 'Fashion Campaign Photo Shoot',
    brand: 'Junglee Essentials',
    talentTags: ['Model', 'Stylist'],
    location: 'Bangalore',
    status: 'Boosted',
    requirementPills: ['Female', '20-25', '0-5 yrs+', 'Other Skills'],
    description: 'Urban streetwear catalog. Your profile was boosted for this role.',
  },
]

type ApplicationFilter = 'all' | 'pending' | 'boosted' | 'booked'
const applicationFilter = ref<ApplicationFilter>('all')

const filteredApplications = computed(() => {
  const list = mockMyApplications
  if (applicationFilter.value === 'all') return list
  return list.filter((a) => a.status.toLowerCase() === applicationFilter.value)
})

function viewJobDetails(_job: RecommendedJob | MyApplication) {
  // Placeholder
}

function applyToJob(_job: RecommendedJob) {
  // Placeholder
}

function setFilter(f: ApplicationFilter) {
  applicationFilter.value = f
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-8 pt-28 md:pb-12 md:pt-32">
    <!-- Starry Galaxy Background -->
    <div class="stars-bg pointer-events-none fixed inset-0 -z-10 bg-[#080c18]" aria-hidden="true">
      <div class="nebula-bg absolute inset-0"></div>
    </div>

    <div class="mx-auto w-full max-w-5xl">
      <!-- Welcome section -->
      <header class="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Welcome <span class="text-primary-500">{{ displayName }}</span>
          </h1>
          <p class="mt-2 text-sm text-white/80 md:text-base">Here's what's happening with your talent profile today.</p>
        </div>
        <button
          type="button"
          class="font-medium inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-dark-600/80 px-5 py-3.5 text-sm text-white shadow-lg ring-1 ring-dark-600 transition-all hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
          @click="onEditProfile">
          <NuxtIcon name="local:pencil" class="size-5 shrink-0" />
          Edit Profile
        </button>
      </header>

      <!-- Stats cards -->
      <section class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-dark-500/95 p-5 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm">
          <div class="flex size-12 items-center justify-center rounded-xl bg-dark-600/80 text-white">
            <NuxtIcon name="local:eye" class="size-6" />
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ mockStats.profileViews }}</p>
            <p class="text-sm text-white/60">Profile Views</p>
          </div>
        </div>
        <div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-dark-500/95 p-5 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm">
          <div class="flex size-12 items-center justify-center rounded-xl bg-dark-600/80 text-white">
            <NuxtIcon name="local:briefcase" class="size-6" />
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ mockStats.activeApplications }}</p>
            <p class="text-sm text-white/60">Active Applications</p>
          </div>
        </div>
        <div class="flex items-center gap-4 rounded-2xl border border-white/10 bg-dark-500/95 p-5 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm">
          <div class="flex size-12 items-center justify-center rounded-xl bg-dark-600/80 text-white">
            <NuxtIcon name="local:share" class="size-6" />
          </div>
          <div>
            <p class="text-2xl font-bold text-white">{{ mockStats.profileSharing }}</p>
            <p class="text-sm text-white/60">Profile Sharing</p>
          </div>
        </div>
      </section>

      <!-- Tabs + Preview Portfolio -->
      <div class="relative mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <!-- Tabs in center -->
        <div class="flex rounded-xl border border-white/10 bg-[#0e1422] p-1">
          <button
            type="button"
            class="font-medium rounded-lg px-6 py-2.5 text-sm transition-colors"
            :class="activeTab === 'projects' ? 'bg-[#FFD700] text-black shadow-sm' : 'text-gray-400 hover:text-white'"
            @click="setTab('projects')">
            Projects
          </button>
          <button
            type="button"
            class="font-medium rounded-lg px-6 py-2.5 text-sm transition-colors"
            :class="activeTab === 'myjobs' ? 'bg-[#FFD700] text-black shadow-sm' : 'text-gray-400 hover:text-white'"
            @click="setTab('myjobs')">
            My Jobs
          </button>
        </div>

        <!-- Preview Portfolio on the right -->
        <div class="sm:absolute sm:right-0">
          <button
            type="button"
            class="font-medium hover:bg-gray-100 inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm text-black transition-all focus:outline-none focus:ring-2 focus:ring-white"
            @click="onPreviewProfile">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Preview Portfolio
          </button>
        </div>
      </div>

      <!-- Projects list -->
      <section v-if="activeTab === 'projects'" class="flex flex-col gap-5">
        <article v-for="p in displayProjects" :key="p.id" class="flex flex-col gap-6 rounded-2xl border border-white/10 bg-[#0e1422] p-6 transition-all duration-200 hover:border-white/20 lg:flex-row">
          <!-- Left: Info -->
          <div class="flex min-w-0 flex-1 flex-col gap-3">
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="font-semibold rounded-full px-3 py-1 text-xs"
                :class="p.status === 'Verified' ? 'border border-[#00e676]/30 bg-[#00e676]/20 text-[#00e676]' : 'border border-[#FFD700]/30 bg-[#b8860b]/30 text-[#FFD700]'">
                {{ p.status }}
              </span>
              <span v-for="t in p.tags" :key="t" class="font-semibold bg-blue-600 rounded-full px-3 py-1 text-xs text-white">
                {{ t }}
              </span>
            </div>

            <h3 class="mt-2 text-xl font-bold leading-snug text-white md:text-2xl">
              {{ p.title }}
            </h3>

            <p class="text-gray-300 text-sm">
              Company Name : <span class="font-medium text-white">{{ p.companyName }}</span>
            </p>

            <div class="flex items-center gap-8">
              <p class="text-gray-300 text-sm">
                Budget: <span class="font-semibold text-white">{{ p.budget }}</span>
              </p>
              <p class="text-gray-300 text-sm">
                Date: <span class="font-semibold text-white">{{ p.date }}</span>
              </p>
            </div>

            <div class="mt-auto pt-4">
              <button
                type="button"
                class="font-semibold hover:bg-gray-100 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm text-black transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0e1422]"
                @click="onEditProject(p)">
                <NuxtIcon name="local:pencil" class="size-4" />
                Edit Project
              </button>
            </div>
          </div>

          <!-- Right: Images -->
          <div class="grid shrink-0 grid-cols-3 gap-3" style="width: 520px; max-width: 100%">
            <div v-for="(m, idx) in p.media?.slice(0, 3) ?? [null, null, null]" :key="idx" class="aspect-[3/4] w-full overflow-hidden rounded-md bg-dark-600/70">
              <img v-if="m?.url" :src="m.url" :alt="m.name || 'Project'" class="size-full object-cover transition-transform duration-500 hover:scale-105" />
              <div v-else class="flex size-full items-center justify-center text-white/30">
                <NuxtIcon name="local:grid" class="size-10" />
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- My Jobs tab: Recommended + My Applications -->
      <section v-else class="space-y-10">
        <!-- Recommended -->
        <div>
          <div class="mb-4 flex items-center justify-between">
            <h2 class="text-xl font-bold text-white md:text-2xl">Recommended</h2>
            <button type="button" class="font-medium hover:text-primary-300 text-sm text-primary-400 focus:underline focus:outline-none">View All</button>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <article v-for="job in mockRecommendedJobs" :key="job.id" class="overflow-hidden rounded-2xl border border-white/10 bg-dark-500/95 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm">
              <div class="aspect-[16/9] w-full overflow-hidden bg-dark-600/70">
                <img :src="job.image" :alt="job.title" class="size-full object-cover" />
              </div>
              <div class="flex flex-col gap-3 p-5">
                <h3 class="text-lg font-bold text-white">{{ job.title }}</h3>
                <p class="text-sm text-white/70">Brand: {{ job.brand }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in job.talentTags" :key="tag" class="font-medium text-primary-300 rounded-full bg-primary-500/20 px-3 py-1 text-xs">
                    {{ tag }}
                  </span>
                </div>
                <div class="flex items-center gap-2 text-xs text-white/60">
                  <span>{{ job.posted }}</span>
                  <span>·</span>
                  <span>{{ job.location }}</span>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="pill in job.requirementPills" :key="pill" class="bg-green-500/20 text-green-300 rounded-full px-2.5 py-0.5 text-xs">
                    {{ pill }}
                  </span>
                </div>
                <p class="line-clamp-2 text-sm text-white/80">{{ job.description }}</p>
                <div class="mt-2 flex gap-3">
                  <button
                    type="button"
                    class="bg-sky-600/90 font-medium hover:bg-sky-600 focus:ring-sky-400 rounded-xl px-4 py-2.5 text-sm text-white transition-colors focus:outline-none focus:ring-2"
                    @click="viewJobDetails(job)">
                    View Details
                  </button>
                  <button
                    type="button"
                    class="rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semi-bold text-black transition-colors hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    @click="applyToJob(job)">
                    Apply
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>

        <!-- My Applications -->
        <div class="border-t border-dashed border-white/20 pt-10">
          <div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-xl font-bold text-white md:text-2xl">My Applications</h2>
            <div class="flex gap-2">
              <button
                v-for="f in ['all', 'pending', 'boosted', 'booked'] as const"
                :key="f"
                type="button"
                class="font-medium rounded-lg px-4 py-2 text-sm capitalize transition-colors"
                :class="applicationFilter === f ? 'bg-primary-500 text-black' : 'bg-dark-600/80 text-white/80 hover:bg-dark-600 hover:text-white'"
                @click="setFilter(f)">
                {{ f }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <article
              v-for="app in filteredApplications"
              :key="app.id"
              class="relative overflow-hidden rounded-2xl border border-white/10 bg-dark-500/95 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm">
              <span
                class="font-medium absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs"
                :class="{
                  'bg-amber-500/25 text-amber-200': app.status === 'Pending',
                  'bg-sky-500/25 text-sky-200': app.status === 'Shortlisted',
                  'text-primary-200 bg-primary-500/25': app.status === 'Boosted',
                  'bg-green-500/20 text-green-300': app.status === 'Booked',
                }">
                {{ app.status }}
              </span>
              <div class="aspect-[16/9] w-full overflow-hidden bg-dark-600/70">
                <img :src="app.image" :alt="app.title" class="size-full object-cover" />
              </div>
              <div class="flex flex-col gap-3 p-5">
                <h3 class="text-lg font-bold text-white">{{ app.title }}</h3>
                <p class="text-sm text-white/70">Brand: {{ app.brand }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="tag in app.talentTags" :key="tag" class="font-medium text-primary-300 rounded-full bg-primary-500/20 px-3 py-1 text-xs">
                    {{ tag }}
                  </span>
                </div>
                <p class="text-xs text-white/60">{{ app.location }}</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="pill in app.requirementPills" :key="pill" class="bg-green-500/20 text-green-300 rounded-full px-2.5 py-0.5 text-xs">
                    {{ pill }}
                  </span>
                </div>
                <p class="line-clamp-2 text-sm text-white/80">{{ app.description }}</p>
                <button
                  type="button"
                  class="bg-sky-600/90 font-medium hover:bg-sky-600 focus:ring-sky-400 mt-2 w-fit rounded-xl px-4 py-2.5 text-sm text-white transition-colors focus:outline-none focus:ring-2"
                  @click="viewJobDetails(app)">
                  View Details
                </button>
              </div>
            </article>
          </div>
          <div class="mt-6 flex justify-center">
            <button
              type="button"
              class="font-medium rounded-xl border border-white/10 bg-dark-600/80 px-6 py-3 text-sm text-white transition-colors hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400">
              View More
            </button>
          </div>
        </div>
      </section>

      <!-- Add project CTA -->
      <div class="mt-10 flex justify-center">
        <NuxtLink
          :to="addProjectRoute"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-primary-500 px-8 py-4 text-base font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500">
          <span class="text-xl leading-none">+</span>
          Add project
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.stars-bg {
  background-image:
    radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0, 0, 0, 0)), radial-gradient(1px 1px at 40px 70px, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
    radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0, 0, 0, 0)), radial-gradient(1.5px 1.5px at 160px 120px, rgba(200, 200, 200, 0.9), rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 240px 90px, #ffffff, rgba(0, 0, 0, 0)), radial-gradient(2px 2px at 300px 200px, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 350px 30px, #ffffff, rgba(0, 0, 0, 0)), radial-gradient(1.5px 1.5px at 450px 100px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 500px 250px, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)), radial-gradient(2px 2px at 600px 150px, #ffffff, rgba(0, 0, 0, 0)),
    radial-gradient(1px 1px at 700px 80px, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0)), radial-gradient(1.5px 1.5px at 800px 250px, #ffffff, rgba(0, 0, 0, 0));
  background-size: 800px 400px;
}

.nebula-bg {
  background-image:
    radial-gradient(circle at 10% 20%, rgba(20, 25, 60, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 15%, rgba(15, 30, 50, 0.4) 0%, transparent 45%),
    radial-gradient(circle at 40% 70%, rgba(30, 20, 60, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(25, 15, 45, 0.3) 0%, transparent 40%);
}
</style>
