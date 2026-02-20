<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Company Details | Gold Fish Talents',
  description: 'Add company details for your project.',
})

const route = useRoute()
const talentType = computed(() => (route.query.type as string) || 'talent')

type DraftProject = {
  projectTitle: string
  tags: string[]
  description: string
  duration: string
  budget: string
  media: { name: string; type: string; url: string }[]
}

type SubmittedProject = {
  id: string
  title: string
  companyName: string
  budget: string
  date: string
  status: 'Under Verification' | 'Verified'
  tags: string[]
  media: { name: string; type: string; url: string }[]
}

const draftProject = useState<DraftProject | null>('job-project-draft', () => null)
const projects = useState<SubmittedProject[]>('job-projects', () => [])

const form = reactive({
  companyName: '',
  employees: '',
  yearEstablished: '',
  description: '',
  gstn: '',
  phone: '',
  website: '',
})

function onCancel() {
  navigateTo({ path: '/jobs/create/projects/add', query: { type: talentType.value } })
}

function submitProject() {
  const draft = draftProject.value
  if (!draft) {
    navigateTo({ path: '/jobs/create/projects/add', query: { type: talentType.value } })
    return
  }

  const newProject: SubmittedProject = {
    id: crypto?.randomUUID?.() ?? `${Date.now()}`,
    title: draft.projectTitle || 'Untitled Project',
    companyName: form.companyName || '—',
    budget: draft.budget || '—',
    date: new Date().toLocaleDateString('en-GB'),
    status: 'Under Verification',
    tags: draft.tags?.length ? draft.tags : ['Project'],
    media: draft.media ?? [],
  }

  projects.value = [newProject, ...projects.value]
  draftProject.value = null

  // Reset the form after successful submission
  const formState = useState('job-project-form')
  formState.value = {
    projectTitle: '',
    tags: '',
    description: '',
    duration: '',
    budget: '',
  }

  navigateTo({ path: '/jobs/create/projects', query: { type: talentType.value } })
}
</script>

<template>
  <main class="relative min-h-[calc(100vh-8rem)] w-full px-4 pb-8 pt-28 md:pb-12 md:pt-32">
    <div class="pointer-events-none fixed inset-0 -z-10 bg-dark-400 bg-gradient-to-b from-dark-400 via-dark-500/20 to-dark-400" aria-hidden="true" />

    <div class="mx-auto w-full max-w-4xl">
      <header class="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-white md:text-3xl">
            <span class="text-white">My</span>
            <span class="text-primary-500"> Projects</span>
          </h1>
          <p class="mt-2 text-sm text-white md:text-base">Showcase your work and achievements</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            form="company-form"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3.5 text-sm font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500">
            Submit project
          </button>
          <button
            type="button"
            class="font-medium inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-dark-600/80 px-5 py-3.5 text-sm text-white shadow-lg ring-1 ring-dark-600 transition-all hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500">
            <svg class="size-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview Profile
          </button>
        </div>
      </header>

      <form id="company-form" class="rounded-2xl border border-white/10 bg-dark-500/95 p-6 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm md:p-8" novalidate @submit.prevent="submitProject">
        <div class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <label for="company-name" class="font-medium text-sm text-white">Company Name</label>
            <input
              id="company-name"
              v-model="form.companyName"
              type="text"
              placeholder="Enter Project Title"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label for="employees" class="font-medium text-sm text-white">No of employees</label>
              <input
                id="employees"
                v-model="form.employees"
                type="text"
                placeholder="Enter no of employees in the company"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="year-established" class="font-medium text-sm text-white">Year of establishment (Optional)</label>
              <input
                id="year-established"
                v-model="form.yearEstablished"
                type="text"
                placeholder="Enter year of establishment"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="description" class="font-medium text-sm text-white">Description (Optional)</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              placeholder="Add a short description of the company"
              class="w-full resize-none rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label for="gstn" class="font-medium text-sm text-white">Company GSTN (Optional)</label>
              <input
                id="gstn"
                v-model="form.gstn"
                type="text"
                placeholder="Company GSTN"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="phone" class="font-medium text-sm text-white">Company Phone</label>
              <input
                id="phone"
                v-model="form.phone"
                type="text"
                placeholder="Enter company contact number"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="website" class="font-medium text-sm text-white">Company Website (Optional)</label>
            <input
              id="website"
              v-model="form.website"
              type="text"
              placeholder="Enter company website link"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              class="font-medium rounded-xl border border-white/10 bg-dark-600/80 px-8 py-4 text-base text-white shadow-lg ring-1 ring-dark-600 transition-all hover:bg-dark-600 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
              @click="onCancel">
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-xl bg-primary-500 px-8 py-4 text-base font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500">
              Add Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
