<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Add Project | Gold Fish Talents',
  description: 'Add a new project to showcase your work.',
})

const route = useRoute()
const talentType = computed(() => (route.query.type as string) || 'talent')

const form = useState('job-project-form', () => ({
  projectTitle: '',
  tags: '',
  description: '',
  duration: '',
  budget: '',
}))

type DraftProject = {
  projectTitle: string
  tags: string[]
  description: string
  duration: string
  budget: string
  media: { name: string; type: string; url: string }[]
}

const draftProject = useState<DraftProject | null>('job-project-draft', () => null)

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const ACCEPT_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'video/quicktime']

const mediaFiles = ref<{ file: File; url: string }[]>([])
const fileInputRef = ref<HTMLInputElement | null>(null)

function openFilePicker() {
  fileInputRef.value?.click()
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const files = input.files
  if (!files?.length) return
  for (const file of Array.from(files)) {
    if (!ACCEPT_TYPES.includes(file.type)) continue
    if (file.size > MAX_FILE_SIZE) continue
    const url = URL.createObjectURL(file)
    mediaFiles.value.push({ file, url })
  }
  input.value = ''
}

function removeMedia(index: number) {
  const item = mediaFiles.value[index]
  if (item) URL.revokeObjectURL(item.url)
  mediaFiles.value.splice(index, 1)
}

onUnmounted(() => {
  mediaFiles.value.forEach((item) => URL.revokeObjectURL(item.url))
  mediaFiles.value = []
})

function onCancel() {
  navigateTo({ path: '/jobs/create/projects', query: { type: talentType.value } })
}

function onAddCompanyDetails() {
  draftProject.value = {
    projectTitle: form.value.projectTitle,
    tags: form.value.tags
      .split(',')
      .map((t: string) => t.trim())
      .filter(Boolean),
    description: form.value.description,
    duration: form.value.duration,
    budget: form.value.budget,
    media: mediaFiles.value.map((m) => ({ name: m.file.name, type: m.file.type, url: m.url })),
  }

  navigateTo({ path: '/jobs/create/projects/company', query: { type: talentType.value } })
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
          <NuxtLink
            :to="{ path: '/jobs/create/projects/add', query: { type: talentType } }"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3.5 text-sm font-semi-bold text-black shadow-lg transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500">
            <span class="text-lg leading-none">+</span>
            Add project
          </NuxtLink>
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

      <!-- Project Details Form -->
      <form class="rounded-2xl border border-white/10 bg-dark-500/95 p-6 shadow-xl ring-1 ring-dark-600 backdrop-blur-sm md:p-8" novalidate @submit.prevent="onAddCompanyDetails">
        <div class="flex flex-col gap-6">
          <!-- Project Title -->
          <div class="flex flex-col gap-2">
            <label for="project-title" class="font-medium text-sm text-white">Project Title</label>
            <input
              id="project-title"
              v-model="form.projectTitle"
              type="text"
              placeholder="Enter Project Title"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Tags -->
          <div class="flex flex-col gap-2">
            <label for="tags" class="font-medium text-sm text-white">Tags</label>
            <input
              id="tags"
              v-model="form.tags"
              type="text"
              placeholder="Add Category tags like jewellery, accessories, fashion etc"
              class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Description -->
          <div class="flex flex-col gap-2">
            <label for="description" class="font-medium text-sm text-white">Description</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              placeholder="Describe your project"
              class="w-full resize-none rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
          </div>

          <!-- Duration & Budget -->
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="flex flex-col gap-2">
              <label for="duration" class="font-medium text-sm text-white">Duration</label>
              <input
                id="duration"
                v-model="form.duration"
                type="text"
                placeholder="Enter Duration"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="budget" class="font-medium text-sm text-white">Budget</label>
              <input
                id="budget"
                v-model="form.budget"
                type="text"
                placeholder="Enter Budget"
                class="w-full rounded-xl border border-white/10 bg-dark-600/80 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>

          <!-- Media Upload -->
          <div class="flex flex-col gap-2">
            <label class="font-medium text-sm text-white">Media</label>
            <input ref="fileInputRef" type="file" accept=".png,.jpg,.jpeg,.mp4,.mov,image/png,image/jpeg,image/jpg,video/mp4,video/quicktime" multiple class="hidden" @change="onFileChange" />
            <div
              role="button"
              tabindex="0"
              class="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/20 bg-dark-600/60 p-8 text-center transition-all hover:bg-dark-600/80 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-600"
              @click="openFilePicker"
              @keydown.enter.space.prevent="openFilePicker">
              <svg class="size-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div class="flex flex-col gap-1">
                <p class="text-sm text-white">Click to upload images or videos</p>
                <p class="text-xs text-white/60">PNG, JPG, MP4, MOV up to 50MB</p>
              </div>
            </div>
            <div v-if="mediaFiles.length > 0" class="mt-4 flex flex-wrap gap-4">
              <div v-for="(item, index) in mediaFiles" :key="item.url" class="relative shrink-0">
                <div class="flex size-24 overflow-hidden rounded-xl border border-white/10 bg-dark-600/80 object-cover md:size-28">
                  <img v-if="item.file.type.startsWith('image/')" :src="item.url" :alt="item.file.name" class="size-full object-cover" />
                  <div v-else class="flex size-full items-center justify-center text-white/60">
                    <svg class="size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove"
                  class="hover:bg-red-500/90 absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-white/10 bg-dark-600 text-white shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                  @click.stop="removeMedia(index)">
                  <span class="sr-only">Remove</span>
                  <svg class="size-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
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
              Add Company Details
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
