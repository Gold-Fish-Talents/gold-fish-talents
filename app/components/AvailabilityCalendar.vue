<template>
  <div v-if="show" class="fixed inset-0 z-[10000] overflow-y-auto" style="background: #0a0e27">
    <div class="mx-auto" style="max-width: 1100px; padding: 0 2rem 3rem 2rem; padding-top: 100px">
      <!-- Back Button -->
      <button
        class="font-semibold mb-6 flex cursor-pointer items-center gap-2 rounded-xl transition-all hover:-translate-x-1"
        style="background: rgba(30, 35, 65, 0.8); border: 1px solid rgba(255, 255, 255, 0.2); color: white; padding: 0.75rem 1.5rem; font-size: 0.95rem"
        @click="closeModal">
        <span style="font-size: 1.2rem">←</span>
        <span>Back</span>
      </button>

      <!-- Main Grid -->
      <div class="grid gap-6" style="grid-template-columns: 1.5fr 1fr">
        <!-- Left: Calendar -->
        <div class="rounded-2xl p-8 text-white" style="background: rgba(30, 35, 65, 0.85); border: 1px solid rgba(255, 255, 255, 0.15)">
          <!-- Calendar Header -->
          <div class="mb-8 flex items-center justify-between">
            <h2 class="font-bold text-white" style="font-size: 1.5rem">{{ currentMonthYear }}</h2>
            <div class="flex gap-2">
              <button
                class="flex cursor-pointer items-center justify-center rounded-xl transition-all hover:bg-white/20"
                style="width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; font-size: 1.5rem"
                @click="previousMonth">
                ‹
              </button>
              <button
                class="flex cursor-pointer items-center justify-center rounded-xl transition-all hover:bg-white/20"
                style="width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); color: white; font-size: 1.5rem"
                @click="nextMonth">
                ›
              </button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="mb-8 grid" style="grid-template-columns: repeat(7, 1fr); gap: 0.5rem">
            <!-- Weekday Headers -->
            <div v-for="day in weekdays" :key="day" class="font-semibold text-center" style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.7); padding: 0.75rem">{{ day }}</div>

            <!-- Days -->
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              class="font-semibold flex items-center justify-center rounded-xl transition-all"
              :style="getDayStyle(day)"
              style="aspect-ratio: 1; font-size: 0.95rem"
              @click="selectDate(day)">
              <span v-if="day.date">{{ day.date }}</span>
            </div>
          </div>

          <!-- Legend -->
          <div class="flex flex-wrap gap-5 pt-5" style="border-top: 1px solid rgba(255, 255, 255, 0.1)">
            <div v-for="item in legend" :key="item.label" class="flex items-center gap-2" style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.8)">
              <span class="inline-block rounded-full" :style="`width:14px; height:14px; background:${item.color};`"></span>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="flex flex-col gap-4">
          <!-- Availability Message -->
          <div
            class="rounded-2xl text-center font-bold"
            style="background: rgba(0, 200, 100, 0.25); border: 1px solid rgba(0, 200, 100, 0.4); padding: 1.25rem 1.5rem; color: #00ff7f; font-size: 1rem">
            Available on your required date
          </div>

          <!-- Summary -->
          <div class="rounded-2xl text-white" style="background: rgba(30, 35, 65, 0.85); border: 1px solid rgba(255, 255, 255, 0.15); padding: 1.5rem">
            <h3 class="mb-4 font-bold text-white" style="font-size: 1.15rem">Availability Summary</h3>
            <div v-for="row in summary" :key="row.label" class="flex items-center justify-between py-3" style="border-bottom: 1px solid rgba(255, 255, 255, 0.1)">
              <span style="font-size: 0.9rem; color: rgba(255, 255, 255, 0.8)">{{ row.label }}</span>
              <span class="font-bold text-white" style="font-size: 1rem">{{ row.value }}</span>
            </div>
          </div>

          <!-- Talent Card -->
          <div class="flex gap-4 rounded-2xl text-white" style="background: rgba(30, 35, 65, 0.85); border: 1px solid rgba(255, 255, 255, 0.15); padding: 1.5rem">
            <img :src="applicant.image" :alt="applicant.firstName" class="flex-shrink-0 rounded-xl object-cover" style="width: 70px; height: 70px; border: 2px solid rgba(255, 255, 255, 0.2)" />
            <div class="flex flex-col gap-1">
              <h4 class="m-0 font-bold text-white" style="font-size: 1.1rem">{{ applicant.firstName }} {{ applicant.lastName }}</h4>
              <p class="m-0" style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.75)">Location: {{ applicant.location || 'Kolkata' }}</p>
              <p class="m-0" style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.75)">Years of Experience: {{ applicant.experience || '3+' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  applicant: { type: Object, default: () => ({}) },
  requiredDate: { type: Date, default: null },
})

const emit = defineEmits(['close'])

const currentDate = ref(new Date())
const selectedDate = ref(null)

const bookingData = ref({
  booked: [],
  notAvailable: [],
  yourRequirement: [],
  today: new Date().getDate(),
})

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const legend = [
  { label: 'Today', color: '#ffd700' },
  { label: 'Booked', color: '#00c864' },
  { label: 'Your requirement', color: '#6496ff' },
  { label: 'Not Available', color: '#ff4646' },
]

const loadAvailabilityData = () => {
  try {
    const applicantId = props.applicant.id
    if (!applicantId) {
      bookingData.value.booked = [11, 17, 18, 19]
      bookingData.value.notAvailable = [15, 22]
      bookingData.value.yourRequirement = [25]
      return
    }
    const store = localStorage.getItem('availabilityStore')
    if (store) {
      const all = JSON.parse(store)
      const applicantData = all[applicantId]
      if (applicantData) {
        const monthKey = `${currentDate.value.getFullYear()}-${currentDate.value.getMonth()}`
        const monthData = applicantData[monthKey]
        bookingData.value.booked = monthData?.booked || []
        bookingData.value.notAvailable = monthData?.notAvailable || []
        bookingData.value.yourRequirement = monthData?.yourRequirement || []
        return
      }
    }
    bookingData.value.booked = [11, 17, 18, 19]
    bookingData.value.notAvailable = [15, 22]
    bookingData.value.yourRequirement = [25]
  } catch (e) {
    console.error(e)
  }
}

const currentMonthYear = computed(() => currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }))

const isCurrentMonth = () => {
  const now = new Date()
  return currentDate.value.getMonth() === now.getMonth() && currentDate.value.getFullYear() === now.getFullYear()
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []
  for (let i = 0; i < firstDay; i++) days.push({ date: null })
  for (let date = 1; date <= daysInMonth; date++) {
    days.push({
      date,
      isToday: date === bookingData.value.today && isCurrentMonth(),
      isBooked: bookingData.value.booked.includes(date),
      isNotAvailable: bookingData.value.notAvailable.includes(date),
      isYourRequirement: bookingData.value.yourRequirement.includes(date),
    })
  }
  return days
})

const getDayStyle = (day) => {
  if (!day.date) return 'background: transparent; cursor: default;'
  if (day.isNotAvailable) return 'background: rgba(255,70,70,0.25); border: 2px solid #ff4646; color: #ff6b6b; cursor: not-allowed;'
  if (day.isToday) return 'background: rgba(255,215,0,0.3); border: 2px solid #ffd700; color: #ffd700; cursor: pointer;'
  if (day.isBooked) return 'background: rgba(0,200,100,0.25); border: 2px solid #00c864; color: #00ff7f; cursor: pointer;'
  if (day.isYourRequirement) return 'background: rgba(100,150,255,0.25); border: 2px solid #6496ff; color: #7eb3ff; cursor: pointer;'
  return 'background: rgba(255,255,255,0.05); border: 2px solid transparent; color: rgba(255,255,255,0.9); cursor: pointer;'
}

const summary = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return [
    { label: 'Total available dates :', value: daysInMonth - bookingData.value.notAvailable.length },
    { label: 'Booked Dates :', value: bookingData.value.booked.length },
    { label: 'Not Available Dates :', value: bookingData.value.notAvailable.length },
  ]
})

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1)
  loadAvailabilityData()
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1)
  loadAvailabilityData()
}

const selectDate = (day) => {
  if (day.date && !day.isNotAvailable) selectedDate.value = day.date
}

const closeModal = () => emit('close')

onMounted(loadAvailabilityData)

watch(
  () => props.applicant.id,
  () => {
    if (props.show) loadAvailabilityData()
  }
)
watch(
  () => props.show,
  (v) => {
    if (v) loadAvailabilityData()
  }
)
</script>
