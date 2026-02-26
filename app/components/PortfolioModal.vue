<template>
  <div v-if="show" class="fixed inset-0 z-[9999] overflow-hidden" style="background: rgba(0, 0, 0, 0.95)">
    <!-- Scrollable Content Area -->
    <div class="h-full overflow-y-auto" style="padding-bottom: 90px">
      <div style="background: linear-gradient(135deg, #0a0e27 0%, #1a1e3e 50%, #0f1329 100%); min-height: 100%">
        <!-- Close Button -->
        <button
          class="fixed z-[10000] flex cursor-pointer items-center justify-center rounded-full text-white transition-all hover:rotate-90"
          style="top: 80px; left: 2rem; width: 48px; height: 48px; background: rgba(0, 0, 0, 0.7); border: 1px solid rgba(255, 255, 255, 0.2); font-size: 2rem; line-height: 1"
          @click="closeModal">
          ×
        </button>

        <!-- Modal Content -->
        <div class="mx-auto text-white" style="padding: 5rem 8rem 3rem; max-width: 1400px">
          <!-- ===== HERO — light navy blue box ===== -->
          <section class="mb-8 rounded-2xl p-5" style="background: #131a3a; border: 1px solid rgba(255, 255, 255, 0.12); margin-top: 2rem">
            <div class="grid gap-5" style="grid-template-columns: 1fr 2fr">
              <!-- Name Card -->
              <div class="flex flex-col justify-center rounded-xl" style="background: linear-gradient(135deg, #b8860b 0%, #daa520 100%); padding: 3rem 2rem; min-height: 280px">
                <h1 class="mb-3 font-bold" style="font-size: 3rem; line-height: 1.2; color: #0a0e27; font-style: italic">{{ applicant.firstName }}<br />{{ applicant.lastName }}</h1>
                <p class="font-semibold" style="font-size: 1.1rem; color: rgba(10, 14, 39, 0.8)">
                  {{ applicant.category || 'Fashion Model' }}
                </p>
              </div>

              <!-- Two Profile Photos: large left + two stacked right -->
              <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 1rem; height: 380px">
                <img
                  :src="applicant.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop'"
                  :alt="applicant.firstName"
                  class="w-full rounded-xl object-cover"
                  style="height: 380px" />
                <div style="display: flex; flex-direction: column; gap: 1rem; height: 380px">
                  <img :src="getPortfolioImage(0)" :alt="applicant.firstName" class="w-full rounded-xl object-cover" style="height: 182px; flex-shrink: 0" />
                  <img :src="getPortfolioImage(1)" :alt="applicant.firstName" class="w-full rounded-xl object-cover" style="height: 182px; flex-shrink: 0" />
                </div>
              </div>
            </div>
          </section>

          <!-- ===== SPECS — individual yellow-left-border boxes ===== -->
          <section style="display: flex; gap: 1rem; margin-bottom: 2rem">
            <div
              v-for="detail in details"
              :key="detail.label"
              class="rounded-xl"
              style="flex: 1; padding: 1rem 1.25rem; background: #131a3a; border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #daa520">
              <span class="font-semibold block text-xs" style="color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.25rem">
                {{ detail.label }}
              </span>
              <span class="block font-bold text-white" style="font-size: 1.1rem">
                {{ detail.value }}
              </span>
            </div>
          </section>

          <!-- ===== ABOUT — yellow left border ===== -->
          <section class="mb-8 rounded-2xl" style="background: #131a3a; border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #daa520; padding: 2rem">
            <h3 class="mb-4 font-bold text-white" style="font-size: 1.4rem">About</h3>
            <p style="font-size: 1rem; line-height: 1.8; color: rgba(255, 255, 255, 0.85)">
              {{ applicant.bio || getDefaultBio() }}
            </p>
          </section>

          <!-- ===== GALLERY — navy box, horizontal scroll ===== -->
          <section class="mb-8 rounded-2xl" style="background: #131a3a; border: 1px solid rgba(255, 255, 255, 0.08); border-left: 3px solid #daa520; padding: 1.75rem">
            <h3 class="mb-4 font-bold text-white" style="font-size: 1.4rem">Gallery</h3>

            <!-- Horizontal scroll strip -->
            <div style="display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.75rem; scrollbar-width: thin; scrollbar-color: #daa520 rgba(255, 255, 255, 0.05)">
              <img
                v-for="(img, index) in allGalleryImages"
                :key="index"
                :src="img"
                :alt="`Gallery ${index + 1}`"
                class="flex-shrink-0 cursor-pointer rounded-xl object-cover transition-all hover:scale-105"
                style="height: 280px; width: 210px; border: 1px solid rgba(255, 255, 255, 0.1)"
                @click="openImageViewer(index)" />
            </div>

            <button
              class="font-semibold mt-4 w-full cursor-pointer rounded-xl py-3 text-white transition-all hover:-translate-y-0.5"
              style="background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.15); font-size: 1rem">
              View more in gallery
            </button>
          </section>

          <!-- Projects Section -->
          <section class="mb-10">
            <h2 class="mb-8 text-center font-bold text-white" style="font-size: 2rem">Projects</h2>

            <div v-for="(project, index) in projects" :key="index" class="mb-8 overflow-hidden rounded-2xl" style="background: rgba(20, 25, 50, 0.6); border: 1px solid rgba(255, 255, 255, 0.1)">
              <div class="relative overflow-hidden" style="height: 500px">
                <img :src="project.image" :alt="project.title" class="h-full w-full object-cover" />
                <div class="absolute bottom-0 left-0 right-0 p-10" style="background: linear-gradient(to top, rgba(139, 0, 0, 0.95) 0%, rgba(139, 0, 0, 0.7) 70%, transparent 100%)">
                  <div class="mb-2 font-bold text-white" style="font-size: 2rem">{{ project.brandLogo }}</div>
                  <h3 class="mb-2 font-bold text-white" style="font-size: 1.75rem">{{ project.title }}</h3>
                  <p style="font-size: 1rem; line-height: 1.7; color: rgba(255, 255, 255, 0.95); max-width: 900px">{{ project.description }}</p>
                </div>
              </div>

              <div class="p-8">
                <div class="mb-6 flex flex-col gap-4">
                  <div
                    v-for="meta in [
                      { label: 'Category', value: project.category },
                      { label: 'Client Location', value: project.clientLocation },
                    ]"
                    :key="meta.label">
                    <div class="font-semibold mb-1 text-sm" style="color: rgba(255, 255, 255, 0.6)">{{ meta.label }}:</div>
                    <div class="font-medium text-white" style="font-size: 1.05rem">{{ meta.value }}</div>
                  </div>
                  <div>
                    <div class="font-semibold mb-1 text-sm" style="color: rgba(255, 255, 255, 0.6)">Project Link:</div>
                    <a :href="project.link" target="_blank" style="font-size: 1.05rem; color: #7eb3ff; text-decoration: none">{{ project.linkText }}</a>
                  </div>
                </div>
                <button
                  class="font-semibold w-full cursor-pointer rounded-xl py-4 text-white transition-all hover:-translate-y-0.5"
                  style="background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2)">
                  Read More
                </button>
              </div>

              <div class="grid" style="grid-template-columns: repeat(2, 1fr)">
                <img v-for="(img, idx) in project.additionalImages" :key="idx" :src="img" :alt="`${project.title} ${idx + 1}`" class="w-full object-cover" style="height: 350px" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- Sticky Bottom Action Bar -->
    <div
      class="fixed bottom-0 left-0 right-0 z-[10000] flex items-center justify-between"
      style="background: rgba(15, 19, 41, 0.97); border-top: 1px solid rgba(255, 255, 255, 0.1); padding: 1.25rem 8rem; backdrop-filter: blur(20px)">
      <div class="flex items-center gap-4">
        <h3 class="m-0 font-bold text-white" style="font-size: 1.25rem">{{ applicant.firstName }} {{ applicant.lastName }}</h3>
        <p class="m-0" style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.7)">{{ applicant.category || 'Model' }} with {{ applicant.experience || '2+' }} experience</p>
        <span class="rounded-xl px-3 py-1 text-xs font-bold" :style="getStatusStyle(applicant.status)">
          {{ applicant.status || 'Applied' }}
        </span>
      </div>

      <div class="flex gap-3">
        <button
          class="font-semibold flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 transition-all hover:-translate-y-0.5"
          style="background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 0.95rem"
          @click="handleAvailability">
          📅 Availability
        </button>
        <button
          class="font-semibold flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 transition-all hover:-translate-y-0.5"
          style="background: rgba(255, 255, 255, 0.15); color: white; border: 1px solid rgba(255, 255, 255, 0.2); font-size: 0.95rem"
          @click="handleShortlist">
          📋 Shortlist
        </button>
        <button
          class="font-semibold flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 transition-all hover:-translate-y-0.5"
          style="background: rgba(248, 113, 113, 0.2); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.3); font-size: 0.95rem"
          @click="handleReject">
          ✖ Reject
        </button>
      </div>
    </div>

    <!-- Availability Calendar -->
    <AvailabilityCalendar :show="showAvailability" :applicant="applicant" @close="closeAvailability" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AvailabilityCalendar from './AvailabilityCalendar.vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  applicant: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['close', 'shortlist', 'select', 'reject'])

const showAvailability = ref(false)

const details = computed(() => [
  { label: 'Height', value: props.applicant.height || '5\'8"' },
  { label: 'Bust', value: props.applicant.bust || '32"' },
  { label: 'Waist', value: props.applicant.waist || '26"' },
  { label: 'Hips', value: props.applicant.hips || '36"' },
  { label: 'Shoe', value: props.applicant.shoe || '8' },
])

const portfolioImages = computed(() => {
  if (props.applicant.portfolio?.length > 0) return props.applicant.portfolio
  return [
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=700&fit=crop',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=700&fit=crop',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=700&fit=crop',
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=700&fit=crop',
  ]
})

// Extra demo images for horizontal scroll showcase
const extraDemoImages = [
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop',
  'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&h=600&fit=crop',
]

// Combine applicant portfolio + extra demos for a full scrollable gallery
const allGalleryImages = computed(() => (props.applicant.gallery?.length ? props.applicant.gallery : [...portfolioImages.value, ...extraDemoImages]))

const projects = ref([
  {
    brandLogo: 'Astra Motors',
    title: 'Astra Motors',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Donec rutrum congue leo eget malesuada. Vivamus magna justo, lacinia eget consectetur sed.',
    category: 'Automobile Advertisement',
    clientLocation: 'Jaipur (Rajasthan, India)',
    link: 'https://www.youtube.com/watch?v=example',
    linkText: 'https://www.youtube.com/watch?v=...',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop',
    additionalImages: ['https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=600&fit=crop', 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=600&fit=crop'],
  },
])

const getStatusStyle = (status) => {
  const map = {
    Applied: 'background: rgba(56,189,248,0.2); color: #38bdf8; border: 1px solid rgba(56,189,248,0.4);',
    Shortlisted: 'background: rgba(250,204,21,0.2); color: #facc15; border: 1px solid rgba(250,204,21,0.4);',
    Selected: 'background: rgba(74,222,128,0.2); color: #4ade80; border: 1px solid rgba(74,222,128,0.4);',
    Rejected: 'background: rgba(248,113,113,0.2); color: #f87171; border: 1px solid rgba(248,113,113,0.4);',
  }
  return map[status] || map['Applied']
}

const getDefaultBio = () =>
  `Hi there! I'm ${props.applicant.firstName}, a professional ${props.applicant.category || 'model'} with ${props.applicant.experience || '5 years'} of experience. I'm a versatile talent with a strong sense of visual storytelling. I bring elegance, confidence, and dedication to every shoot.`

const getPortfolioImage = (index) => portfolioImages.value[index] || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop'

const closeModal = () => emit('close')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleApplied = () => closeModal()
const handleShortlist = () => emit('shortlist', props.applicant)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleSelect = () => emit('select', props.applicant)
const handleReject = () => emit('reject', props.applicant)
const handleAvailability = () => {
  showAvailability.value = true
}
const closeAvailability = () => {
  showAvailability.value = false
}
const openImageViewer = (index) => console.log('Open image viewer at index:', index)
</script>
