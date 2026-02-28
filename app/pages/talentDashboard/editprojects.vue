<script setup>
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const projectId = computed(() => route.query.id || '1')

// ============================================================
// MOCK DATA — replace with your API fetch using projectId
// e.g. const project = await $fetch(`/api/projects/${projectId.value}`)
// ============================================================
const project = ref({
  id: projectId.value,
  title: 'Advertising Project for WoW Momo',
  company: 'WOW momo',
  budget: '20K',
  date: '26.05.2025',
  status: 'Under Verification',
  category: 'Food',
  budgetType: 'High Budget',
  description:
    'A commercial food shoot for WoW Momo brand featuring lifestyle and product photography. The project aimed to highlight the freshness and taste of their momos through candid, natural-looking shots.',
  images: [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80',
  ],
})

// Form state — pre-filled with project data
const form = reactive({
  title: project.value.title,
  company: project.value.company,
  budget: project.value.budget,
  date: project.value.date,
  category: project.value.category,
  budgetType: project.value.budgetType,
  description: project.value.description,
})

const isSaving = ref(false)
const saved = ref(false)

const handleSave = async () => {
  isSaving.value = true
  // TODO: await $fetch(`/api/projects/${projectId}`, { method: 'PUT', body: form })
  await new Promise((r) => setTimeout(r, 800))
  isSaving.value = false
  saved.value = true
  setTimeout(() => (saved.value = false), 2500)
}

const categoryOptions = ['Food', 'Fashion', 'Beauty', 'Automobile', 'Lifestyle', 'Sports', 'Technology']
const budgetOptions = ['Low Budget', 'Mid Budget', 'High Budget']

// Image upload preview
const previewImages = ref([...project.value.images])
const fileInput = ref(null)

const handleImageUpload = (e) => {
  const files = Array.from(e.target.files)
  files.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (ev) => previewImages.value.push(ev.target.result)
    reader.readAsDataURL(file)
  })
}

const removeImage = (index) => {
  previewImages.value.splice(index, 1)
}
</script>

<template>
  <div class="mx-auto min-h-screen max-w-5xl bg-[#080c18] px-6 pb-16 pt-24 text-white">
    <!-- ── Page Header ─────────────────────────────────── -->
    <div class="mb-10 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink
          to="/talentdashboard/myprojects"
          class="text-gray-400 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 hover:text-white">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="font-black text-3xl tracking-tight">Edit <span class="text-[#FFD700]">Project</span></h1>
          <p class="text-gray-400 mt-0.5 text-sm">Update your project details</p>
        </div>
      </div>

      <!-- Save Button -->
      <button
        :disabled="isSaving"
        class="flex items-center gap-2 rounded-full bg-[#FFD700] px-7 py-3 text-sm font-bold text-black shadow-[0_0_20px_rgba(255,215,0,0.35)] transition-all duration-200 hover:bg-[#ffe033] hover:shadow-[0_0_28px_rgba(255,215,0,0.55)] active:scale-95 disabled:opacity-70"
        @click="handleSave">
        <svg v-if="isSaving" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <svg v-else-if="saved" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        {{ isSaving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes' }}
      </button>
    </div>

    <div class="grid grid-cols-5 gap-6">
      <!-- ── Left: Form ─────────────────────────────── -->
      <div class="col-span-3 flex flex-col gap-5">
        <!-- Project Title -->
        <div class="border-white/8 rounded-2xl border bg-[#0e1422] p-5">
          <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Project Title</label>
          <input
            v-model="form.title"
            type="text"
            placeholder="Enter project title"
            class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-[#FFD700]/50" />
        </div>

        <!-- Company Name -->
        <div class="border-white/8 rounded-2xl border bg-[#0e1422] p-5">
          <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Company Name</label>
          <input
            v-model="form.company"
            type="text"
            placeholder="Enter company name"
            class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-[#FFD700]/50" />
        </div>

        <!-- Budget + Date -->
        <div class="border-white/8 rounded-2xl border bg-[#0e1422] p-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Budget</label>
              <input
                v-model="form.budget"
                type="text"
                placeholder="e.g. 20K"
                class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-[#FFD700]/50" />
            </div>
            <div>
              <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Date</label>
              <input
                v-model="form.date"
                type="text"
                placeholder="DD.MM.YYYY"
                class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-[#FFD700]/50" />
            </div>
          </div>
        </div>

        <!-- Category + Budget Type -->
        <div class="border-white/8 rounded-2xl border bg-[#0e1422] p-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Category</label>
              <select
                v-model="form.category"
                class="w-full cursor-pointer rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-[#FFD700]/50">
                <option v-for="opt in categoryOptions" :key="opt" :value="opt" class="bg-[#111827]">{{ opt }}</option>
              </select>
            </div>
            <div>
              <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Budget Type</label>
              <select
                v-model="form.budgetType"
                class="w-full cursor-pointer rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition-all duration-200 focus:border-[#FFD700]/50">
                <option v-for="opt in budgetOptions" :key="opt" :value="opt" class="bg-[#111827]">{{ opt }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="border-white/8 rounded-2xl border bg-[#0e1422] p-5">
          <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Description</label>
          <textarea
            v-model="form.description"
            rows="5"
            placeholder="Describe the project..."
            class="placeholder-gray-500 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-white outline-none transition-all duration-200 focus:border-[#FFD700]/50" />
        </div>
      </div>

      <!-- ── Right: Images ──────────────────────────── -->
      <div class="col-span-2 flex flex-col gap-5">
        <div class="border-white/8 rounded-2xl border bg-[#0e1422] p-5">
          <label class="mb-4 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Project Images</label>

          <!-- Image Grid -->
          <div class="mb-4 grid grid-cols-2 gap-3">
            <div v-for="(img, i) in previewImages" :key="i" class="group relative overflow-hidden rounded-xl" style="aspect-ratio: 4/3">
              <img :src="img" class="h-full w-full object-cover" />
              <!-- Remove overlay -->
              <div class="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/50">
                <button
                  class="bg-red-500/80 hover:bg-red-500 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-200 group-hover:opacity-100"
                  @click="removeImage(i)">
                  <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Upload New -->
            <button
              class="group flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/15 transition-all duration-200 hover:border-[#FFD700]/50"
              style="aspect-ratio: 4/3"
              @click="fileInput.click()">
              <div class="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-[#FFD700]/10">
                <svg class="text-gray-500 h-5 w-5 transition-colors group-hover:text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span class="text-gray-500 group-hover:text-gray-400 text-xs transition-colors">Add image</span>
            </button>
            <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="handleImageUpload" />
          </div>

          <p class="text-gray-500 text-xs">Click on an image and hover to remove it. Max 6 images recommended.</p>
        </div>

        <!-- Status (read-only) -->
        <div class="border-white/8 rounded-2xl border bg-[#0e1422] p-5">
          <label class="mb-3 block text-xs font-bold uppercase tracking-widest text-[#FFD700]">Project Status</label>
          <div
            :class="[
              'font-semibold inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm',
              project.status === 'Verified'
                ? 'border border-[#00e676]/30 bg-[#00e676]/20 text-[#00e676]'
                : project.status === 'Under Verification'
                  ? 'border border-[#FFD700]/30 bg-[#b8860b]/30 text-[#FFD700]'
                  : 'bg-red-500/20 text-red-400 border-red-500/30 border',
            ]">
            <span class="h-2 w-2 rounded-full" :class="project.status === 'Verified' ? 'bg-[#00e676]' : project.status === 'Under Verification' ? 'bg-[#FFD700]' : 'bg-red-400'" />
            {{ project.status }}
          </div>
          <p class="text-gray-500 mt-3 text-xs">Status is managed by the platform and cannot be edited.</p>
        </div>

        <!-- Danger Zone -->
        <div class="bg-red-500/5 border-red-500/20 rounded-2xl border p-5">
          <label class="text-red-400 mb-3 block text-xs font-bold uppercase tracking-widest">Danger Zone</label>
          <button class="border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10 text-red-400 font-semibold w-full rounded-xl border py-3 text-sm transition-all duration-200">
            Delete Project
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
