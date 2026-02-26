<template>
  <div class="font-sans relative min-h-screen overflow-x-hidden bg-[#0a0e27] px-6 pb-10 pt-32 text-white">
    <!-- Header -->
    <header class="relative z-10 mb-8 mt-[100px] flex items-start justify-between">
      <div class="flex-1">
        <h1 class="mb-2 text-4xl font-bold">
          Welcome
          <span style="background: linear-gradient(to right, #fde047, #facc15); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text">{{ clientName }}</span>
        </h1>
        <p class="text-base text-white/70">Manage your talent casting campaigns</p>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: stretch; min-width: 160px">
        <button
          style="
            background: #facc15;
            color: #0a0e27;
            padding: 0.65rem 1.25rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            font-size: 0.9rem;
            white-space: nowrap;
            text-align: center;
          "
          @click="openPostJob">
          + Post New Job
        </button>
        <button
          style="
            background: white;
            color: black;
            padding: 0.65rem 1.25rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            border: 2px solid white;
            font-size: 0.9rem;
            white-space: nowrap;
            text-align: center;
          "
          @click="showEditProfile = true">
          ✏️ Edit Profile
        </button>
      </div>
    </header>

    <!-- Stats Cards -->
    <section class="relative z-10 mb-10">
      <div class="grid grid-cols-4 gap-5">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-row items-center gap-4 rounded-2xl border border-white/10 bg-[#1a1e3e]/60 p-6 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#1a1e3e]/80">
          <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl" :style="{ background: stat.iconBg }">
            <span v-html="stat.icon"></span>
          </div>
          <div class="flex flex-col">
            <div class="text-sm text-white/70">{{ stat.label }}</div>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Jobs Section -->
    <section class="relative z-10">
      <div class="mb-6 flex items-center justify-between">
        <h2 class="font-semibold text-2xl">Your Jobs</h2>
        <div class="flex gap-2 rounded-full border border-white/20 p-1 backdrop-blur-xl" style="background: rgba(255, 255, 255, 0.08)">
          <button
            :class="['font-medium rounded-full border-0 px-6 py-2 text-sm transition-all', currentTab === 'active' ? 'bg-white text-[#0a0e27] shadow-md' : 'text-white/70 hover:text-white']"
            @click="currentTab = 'active'">
            Active Jobs ({{ activeJobs.length }})
          </button>

          <button
            :class="['font-medium rounded-full border-0 px-6 py-2 text-sm transition-all', currentTab === 'closed' ? 'bg-white text-[#0a0e27] shadow-md' : 'text-white/70 hover:text-white']"
            @click="currentTab = 'closed'">
            Old Jobs ({{ closedJobs }})
          </button>
        </div>
      </div>

      <div class="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-6">
        <div
          v-for="job in displayedJobs"
          :key="job.id"
          class="hover:border-yellow-400/30 rounded-2xl border border-white/10 bg-[#14193280] p-6 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
          <div class="mb-1 flex items-start justify-between">
            <h3 class="font-semibold text-lg text-white">{{ job.title }}</h3>
            <span class="font-semibold rounded-full px-3 py-1 text-xs" style="background: rgba(74, 222, 128, 0.2); color: #4ade80">Active</span>
          </div>
          <div class="mb-4 flex items-center justify-between">
            <span class="text-sm" style="color: rgba(255, 255, 255, 0.7)">Brand: {{ job.brand }}</span>
            <span class="font-medium inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs" style="color: #38bdf8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" clip-rule="evenodd" />
              </svg>
              {{ job.location }}
            </span>
          </div>
          <div class="mb-4 flex flex-wrap items-center gap-2">
            <span class="text-sm" style="color: rgba(255, 255, 255, 0.7)">Talent Needed:</span>
            <span
              v-for="talent in job.talentNeeded"
              :key="talent"
              style="background: rgba(250, 204, 21, 0.2); color: #facc15; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600"
              >{{ talent }}</span
            >
          </div>
          <div class="mb-4 rounded-xl bg-white/5 p-4">
            <div v-for="(model, index) in job.models" :key="index" class="mb-2 flex flex-wrap items-center gap-2 last:mb-0">
              <span class="font-semibold text-sm text-white" style="min-width: 52px">Model {{ index + 1 }}</span>

              <!-- Gender: Venus/Mars symbol -->
              <span class="font-medium inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs" style="background: rgba(74, 222, 128, 0.2); color: #4ade80">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="5" />
                  <line x1="11" y1="16" x2="11" y2="22" />
                  <line x1="8" y1="19" x2="14" y2="19" />
                </svg>
                {{ model.gender }}
              </span>

              <!-- Age: Calendar icon -->
              <span class="font-medium inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs" style="background: rgba(74, 222, 128, 0.2); color: #4ade80">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {{ model.age }}
              </span>

              <!-- Height: simple up-down arrow -->
              <span class="font-medium inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs" style="background: rgba(74, 222, 128, 0.2); color: #4ade80">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4l4-4 4 4h-3v16h3l-4 4-4-4h3V4H8z" />
                </svg>
                {{ model.height || '5 ft 6in +' }}
              </span>

              <!-- Skin Tone: no icon, just text -->
              <span class="font-medium inline-flex items-center rounded-lg px-2.5 py-1 text-xs" style="background: rgba(74, 222, 128, 0.2); color: #4ade80">
                {{ model.skinTone || 'Fair Skin' }}
              </span>
            </div>
          </div>
          <p class="mb-4 text-sm leading-relaxed text-white/70">{{ job.description }}</p>
          <div class="flex gap-2">
            <button
              style="flex: 1; background: #facc15; color: #0a0e27; padding: 0.75rem; border-radius: 10px; font-weight: 600; cursor: pointer; border: none; font-size: 0.95rem"
              @click="viewApplicants(job)">
              View Applicants ({{ getApplicantCount(job.id) }})
            </button>
            <button class="h-10 w-10 cursor-pointer rounded-xl border border-white/20 bg-white/10 text-base transition-all hover:bg-white/15" @click="editJob(job)">✏️</button>
            <button class="h-10 w-10 cursor-pointer rounded-xl border border-white/20 bg-white/10 text-base transition-all hover:bg-white/15" @click="deleteJob(job.id)">✖</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ====================================================== -->
    <!-- STEP 1: Basic Info Page                                -->
    <!-- ====================================================== -->
    <Transition name="page-slide">
      <div v-if="formStep === 1" class="fixed inset-0 z-[2000] overflow-y-auto" style="background: #060b1a">
        <!-- Space background -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="stars-layer"></div>
          <div
            style="
              position: absolute;
              width: 600px;
              height: 400px;
              background: radial-gradient(ellipse, rgba(56, 90, 172, 0.35) 0%, transparent 70%);
              top: 10%;
              left: -100px;
              filter: blur(60px);
            "></div>
          <div
            style="
              position: absolute;
              width: 500px;
              height: 350px;
              background: radial-gradient(ellipse, rgba(80, 50, 150, 0.3) 0%, transparent 70%);
              bottom: 15%;
              right: -80px;
              filter: blur(50px);
            "></div>
          <div style="position: absolute; width: 300px; height: 250px; background: radial-gradient(ellipse, rgba(30, 60, 120, 0.4) 0%, transparent 70%); top: 50%; left: 55%; filter: blur(40px)"></div>
        </div>

        <div class="relative z-10 mx-auto min-h-screen max-w-2xl px-6 py-16">
          <button class="back-btn" @click="closeForm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back to Dashboard
          </button>

          <div class="mb-10">
            <h1 class="mb-3 text-5xl font-bold leading-tight">Post a <span style="color: #facc15">Job</span></h1>
            <p class="text-base text-white/60">Enter your key details to present a refined and professional talent profile.</p>
          </div>

          <div class="form-card">
            <div class="field-group">
              <label class="field-label">Job Title</label>
              <input v-model="newJob.title" placeholder="Add Job Title" class="post-input" />
            </div>
            <div class="field-group">
              <label class="field-label">Brand Name</label>
              <input v-model="newJob.brand" placeholder="Enter your brand name" class="post-input" />
            </div>
            <div class="field-group">
              <label class="field-label">Location</label>
              <input v-model="newJob.location" placeholder="e.g. Mumbai" class="post-input" />
            </div>
            <div class="field-group" style="margin-bottom: 0">
              <label class="field-label">Job Description</label>
              <textarea v-model="newJob.description" placeholder="Describe your shoot" rows="4" class="post-input resize-none"></textarea>
            </div>
          </div>

          <button class="action-btn-yellow" @click="goToStep2">Add Requirements</button>
        </div>
      </div>
    </Transition>

    <!-- ====================================================== -->
    <!-- STEP 2: Talent Requirements Page                       -->
    <!-- ====================================================== -->
    <Transition name="page-slide">
      <div v-if="formStep === 2" class="fixed inset-0 z-[2000] overflow-y-auto" style="background: #060b1a">
        <!-- Space background -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="stars-layer"></div>
          <div
            style="
              position: absolute;
              width: 600px;
              height: 400px;
              background: radial-gradient(ellipse, rgba(56, 90, 172, 0.35) 0%, transparent 70%);
              top: 10%;
              left: -100px;
              filter: blur(60px);
            "></div>
          <div
            style="
              position: absolute;
              width: 500px;
              height: 350px;
              background: radial-gradient(ellipse, rgba(80, 50, 150, 0.3) 0%, transparent 70%);
              bottom: 15%;
              right: -80px;
              filter: blur(50px);
            "></div>
          <div style="position: absolute; width: 300px; height: 250px; background: radial-gradient(ellipse, rgba(30, 60, 120, 0.4) 0%, transparent 70%); top: 50%; left: 55%; filter: blur(40px)"></div>
        </div>

        <div class="relative z-10 mx-auto min-h-screen max-w-2xl px-6 py-16">
          <button class="back-btn" @click="formStep = 1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back
          </button>

          <div class="mb-10">
            <h1 class="mb-3 text-5xl font-bold leading-tight">Post a <span style="color: #facc15">Job</span></h1>
            <p class="text-base text-white/60">Enter your key details to present a refined and professional talent profile.</p>
          </div>

          <!-- One card per talent -->
          <div v-for="(talent, index) in newJob.models" :key="index" class="form-card" style="margin-bottom: 1.25rem">
            <!-- Select Talent Category -->
            <div class="field-group">
              <label class="field-label">Select Talent Category</label>
              <div class="select-wrapper">
                <select v-model="talent.category" class="post-input sel-pad">
                  <option value="" disabled>Select category</option>
                  <option value="Model">Model</option>
                  <option value="Makeup Artist">Makeup Artist</option>
                  <option value="Photographer">Photographer</option>
                  <option value="Stylist">Stylist</option>
                  <option value="Actor">Actor</option>
                  <option value="Dancer">Dancer</option>
                  <option value="Hairstylist">Hairstylist</option>
                </select>
                <svg class="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </div>

            <!-- Gender + Age -->
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Gender</label>
                <div class="select-wrapper">
                  <select v-model="talent.gender" class="post-input sel-pad">
                    <option value="" disabled>Select your Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Any">Any</option>
                  </select>
                  <svg class="select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
                </div>
              </div>
              <div>
                <label class="field-label">Age Range</label>
                <input v-model="talent.age" placeholder="e.g. 18-25" class="post-input" />
              </div>
            </div>

            <!-- Skin Tone + Height -->
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Skin Tone</label>
                <input v-model="talent.skinTone" placeholder="e.g. Fair/ Wheatish/ Dusky" class="post-input" />
              </div>
              <div>
                <label class="field-label">Height (cm)</label>
                <input v-model="talent.height" placeholder="Height in cm" class="post-input" />
              </div>
            </div>

            <!-- Weight + Waist -->
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Weight (kg)</label>
                <input v-model="talent.weight" placeholder="Weight in Kg" class="post-input" />
              </div>
              <div>
                <label class="field-label">Waist (cm)</label>
                <input v-model="talent.waist" placeholder="Waist size in cm" class="post-input" />
              </div>
            </div>

            <!-- Chest + Shoulder -->
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Chest (cm)</label>
                <input v-model="talent.chest" placeholder="Chest size in cm" class="post-input" />
              </div>
              <div>
                <label class="field-label">Shoulder (cm)</label>
                <input v-model="talent.shoulder" placeholder="Shoulder size in cm" class="post-input" />
              </div>
            </div>

            <!-- Hip + Shoe Size -->
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Hip (cm)</label>
                <input v-model="talent.hip" placeholder="Hip size in cm" class="post-input" />
              </div>
              <div>
                <label class="field-label">Shoe Size</label>
                <input v-model="talent.shoeSize" placeholder="e.g. UK 6/ EU 39" class="post-input" />
              </div>
            </div>

            <!-- Talent Role Description -->
            <div style="margin-bottom: 0">
              <label class="field-label">Talent Role Description</label>
              <textarea v-model="talent.roleDescription" placeholder="Describe the model's role look and on camera presense" rows="3" class="post-input resize-none"></textarea>
            </div>

            <button
              v-if="newJob.models.length > 1"
              type="button"
              style="
                margin-top: 1rem;
                background: rgba(248, 113, 113, 0.15);
                color: #f87171;
                border: 1px solid rgba(248, 113, 113, 0.3);
                padding: 0.5rem 1rem;
                border-radius: 8px;
                cursor: pointer;
                font-size: 0.8rem;
              "
              @click="removeModel(index)">
              Remove Talent {{ index + 1 }}
            </button>
          </div>

          <!-- Buttons -->
          <button class="action-btn-white" @click="addModel">Add Another Talent</button>
          <button class="action-btn-yellow" @click="formStep = 3">Add Shoot Details</button>
        </div>
      </div>
    </Transition>

    <!-- ====================================================== -->
    <!-- STEP 3: Shoot Details Page                              -->
    <!-- ====================================================== -->
    <Transition name="page-slide">
      <div v-if="formStep === 3" class="fixed inset-0 z-[2000] overflow-y-auto" style="background: #060b1a">
        <!-- Space background -->
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="stars-layer"></div>
          <div
            style="
              position: absolute;
              width: 600px;
              height: 400px;
              background: radial-gradient(ellipse, rgba(56, 90, 172, 0.35) 0%, transparent 70%);
              top: 10%;
              left: -100px;
              filter: blur(60px);
            "></div>
          <div
            style="
              position: absolute;
              width: 500px;
              height: 350px;
              background: radial-gradient(ellipse, rgba(80, 50, 150, 0.3) 0%, transparent 70%);
              bottom: 15%;
              right: -80px;
              filter: blur(50px);
            "></div>
          <div style="position: absolute; width: 300px; height: 250px; background: radial-gradient(ellipse, rgba(30, 60, 120, 0.4) 0%, transparent 70%); top: 50%; left: 55%; filter: blur(40px)"></div>
        </div>

        <div class="relative z-10 mx-auto min-h-screen max-w-2xl px-6 py-16">
          <button class="back-btn" @click="formStep = 2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            Back
          </button>

          <div class="mb-10">
            <h1 class="mb-3 text-5xl font-bold leading-tight">Post a <span style="color: #facc15">Job</span></h1>
            <p class="text-base text-white/60">Enter your key details to present a refined and professional talent profile.</p>
          </div>

          <div class="form-card">
            <!-- Shoot Budget + Shoot Location -->
            <div class="mb-5 grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Shoot Budget</label>
                <input v-model="shootDetails.budget" placeholder="Enter Shoot Budget" class="post-input" />
              </div>
              <div>
                <label class="field-label">Shoot Location</label>
                <input v-model="shootDetails.location" placeholder="Enter Shoot Location" class="post-input" />
              </div>
            </div>

            <!-- Shoot Date -->
            <div class="field-group">
              <label class="field-label">Shoot Date</label>
              <input v-model="shootDetails.date" type="date" placeholder="Shoot Date" class="post-input" style="color-scheme: dark" />
            </div>

            <!-- Shoot Description -->
            <div style="margin-bottom: 0">
              <label class="field-label">Shoot Description</label>
              <textarea v-model="shootDetails.description" placeholder="Describe your shoot" rows="4" class="post-input resize-none"></textarea>
            </div>
          </div>

          <button class="action-btn-yellow" @click="submitJob">Submit</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const clientName = ref('Client')
const formStep = ref(0) // 0=hidden, 1=basic info, 2=requirements
const showEditProfile = ref(false)
const currentTab = ref('active')

const blankTalent = () => ({
  category: '',
  gender: '',
  age: '',
  skinTone: '',
  height: '',
  weight: '',
  waist: '',
  chest: '',
  shoulder: '',
  hip: '',
  shoeSize: '',
  roleDescription: '',
})

const newJob = reactive({
  title: '',
  brand: '',
  location: '',
  description: '',
  models: [blankTalent()],
})

const shootDetails = reactive({
  budget: '',
  location: '',
  date: '',
  description: '',
})

const jobs = ref([
  {
    id: 1,
    title: 'Luxury Jewellery Ad Shoot',
    brand: 'Aurora Jewels',
    location: 'Mumbai',
    talentNeeded: ['Model', 'Makeup Artist'],
    description: 'Looking for a model and a makeup artist for an upcoming brand shoot. The project involves coordinated styling, on-set collaboration, and a professional production setup.',
    models: [
      { category: 'Model', gender: 'Female', age: '22-27', skinTone: 'Fair Skin', height: '170', weight: '', waist: '', chest: '', shoulder: '', hip: '', shoeSize: '', roleDescription: '' },
      { category: 'Makeup Artist', gender: 'Female', age: '22-27', skinTone: 'Fair Skin', height: '165', weight: '', waist: '', chest: '', shoulder: '', hip: '', shoeSize: '', roleDescription: '' },
    ],
    status: 'active',
  },
])

const applicantsStore = ref({
  1: [
    {
      id: 1,
      name: 'Olivia Rodrigo',
      category: 'Model',
      location: 'Mumbai',
      experience: '5 years',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      status: 'Applied',
      email: 'olivia@example.com',
      phone: '+91 98765 43210',
      bio: 'Professional fashion model with extensive experience in luxury brand campaigns.',
      skills: ['Runway', 'Editorial', 'Commercial', 'Fashion'],
      portfolio: [],
    },
    {
      id: 2,
      name: 'Emma Watson',
      category: 'Model',
      location: 'Mumbai',
      experience: '5 years',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
      status: 'Applied',
      email: 'emma@example.com',
      phone: '+91 98765 43211',
      bio: 'Award-winning model with a passion for high-fashion.',
      skills: ['High Fashion', 'Beauty', 'Lifestyle'],
      portfolio: [],
    },
  ],
})

const activeJobs = computed(() => jobs.value.filter((j) => j.status === 'active'))
const closedJobs = computed(() => jobs.value.filter((j) => j.status === 'closed').length)
const displayedJobs = computed(() => (currentTab.value === 'active' ? activeJobs.value : jobs.value.filter((j) => j.status === 'closed')))
const totalApplicants = computed(() => Object.values(applicantsStore.value).reduce((s, a) => s + a.length, 0))
const shortlistedTalents = computed(() => Object.values(applicantsStore.value).reduce((s, a) => s + a.filter((x) => x.status === 'Shortlisted' || x.status === 'Selected').length, 0))
const stats = computed(() => [
  {
    label: 'Active Jobs',
    value: activeJobs.value.length,
    iconBg: 'rgba(250,204,21,0.18)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#facc15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>`,
  },
  {
    label: 'Total Applicants',
    value: totalApplicants.value,
    iconBg: 'rgba(56,189,248,0.18)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>`,
  },
  {
    label: 'Shortlisted Talents',
    value: shortlistedTalents.value,
    iconBg: 'rgba(52,211,153,0.18)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
    </svg>`,
  },
  {
    label: 'Closed Job',
    value: closedJobs.value,
    iconBg: 'rgba(167,139,250,0.18)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>`,
  },
])

const getApplicantCount = (jobId) => applicantsStore.value[jobId]?.length ?? 0

const openPostJob = () => {
  Object.assign(newJob, { title: '', brand: '', location: '', description: '', models: [blankTalent()] })
  formStep.value = 1
}

const goToStep2 = () => {
  if (!newJob.title || !newJob.brand || !newJob.location || !newJob.description) {
    alert('Please fill in all required fields.')
    return
  }
  formStep.value = 2
}

const submitJob = () => {
  const newJobId = Date.now()
  const talentNeeded = [...new Set(newJob.models.map((m) => m.category).filter(Boolean))]
  jobs.value.push({
    id: newJobId,
    title: newJob.title,
    brand: newJob.brand,
    location: newJob.location,
    talentNeeded: talentNeeded.length > 0 ? talentNeeded : ['Model'],
    description: newJob.description,
    models: newJob.models.map((m) => ({ ...m })),
    shootBudget: shootDetails.budget,
    shootLocation: shootDetails.location,
    shootDate: shootDetails.date,
    shootDescription: shootDetails.description,
    status: 'active',
  })
  applicantsStore.value[newJobId] = []
  closeForm()
  alert('✅ Job posted successfully!')
}

const closeForm = () => {
  formStep.value = 0
  Object.assign(shootDetails, { budget: '', location: '', date: '', description: '' })
}
const addModel = () => newJob.models.push(blankTalent())
const removeModel = (index) => newJob.models.splice(index, 1)
const editJob = (_job) => alert('Edit functionality - coming soon!')

const viewApplicants = (job) => {
  localStorage.setItem('selectedJobId', job.id)
  localStorage.setItem('jobData', JSON.stringify(job))
  localStorage.setItem('applicantsData', JSON.stringify(applicantsStore.value[job.id] || []))
  navigateTo('/applicants')
}

const deleteJob = (jobId) => {
  if (confirm('Are you sure you want to delete this job?')) {
    jobs.value = jobs.value.filter((j) => j.id !== jobId)
    const { [jobId]: _, ...rest } = applicantsStore.value
    applicantsStore.value = rest
  }
}

watch(applicantsStore, (v) => localStorage.setItem('applicantsStore', JSON.stringify(v)), { deep: true })
onMounted(() => {
  const saved = localStorage.getItem('applicantsStore')
  if (saved) {
    try {
      applicantsStore.value = JSON.parse(saved)
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<style scoped>
.stars-layer {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 8% 12%, rgba(255, 255, 255, 0.8) 0%, transparent 100%), radial-gradient(1px 1px at 22% 38%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 38% 7%, rgba(255, 255, 255, 0.6) 0%, transparent 100%), radial-gradient(1px 1px at 53% 28%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 68% 16%, rgba(255, 255, 255, 0.7) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 83% 43%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 14% 63%, rgba(255, 255, 255, 0.4) 0%, transparent 100%), radial-gradient(1px 1px at 29% 78%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(1px 1px at 58% 68%, rgba(255, 255, 255, 0.5) 0%, transparent 100%), radial-gradient(1px 1px at 78% 83%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 91% 22%, rgba(255, 255, 255, 0.7) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 4% 88%, rgba(255, 255, 255, 0.5) 0%, transparent 100%),
    radial-gradient(1px 1px at 45% 53%, rgba(255, 255, 255, 0.3) 0%, transparent 100%), radial-gradient(1px 1px at 71% 58%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 18% 48%, rgba(255, 255, 255, 0.5) 0%, transparent 100%), radial-gradient(1px 1px at 88% 72%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 33% 23%, rgba(255, 255, 255, 0.6) 0%, transparent 100%), radial-gradient(1px 1px at 63% 91%, rgba(255, 255, 255, 0.4) 0%, transparent 100%),
    radial-gradient(1px 1px at 96% 55%, rgba(255, 255, 255, 0.3) 0%, transparent 100%), radial-gradient(1px 1px at 2% 35%, rgba(255, 255, 255, 0.5) 0%, transparent 100%);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 0.875rem;
  margin-bottom: 2rem;
  transition: color 0.2s;
}
.back-btn:hover {
  color: white;
}

.form-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 1rem;
}

.field-group {
  margin-bottom: 1.25rem;
}
.field-label {
  display: block;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.post-input {
  width: 100%;
  background: #0d1526;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0.85rem 1rem;
  color: white;
  font-size: 0.9rem;
  outline: none;
  transition:
    border-color 0.2s,
    background 0.2s;
  box-sizing: border-box;
}
.post-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.post-input:focus {
  border-color: rgba(250, 204, 21, 0.5);
  background: #111b30;
}
.post-input option {
  background: #0d1526;
}
.sel-pad {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 2.5rem;
  cursor: pointer;
}

.select-wrapper {
  position: relative;
}
.select-chevron {
  position: absolute;
  right: 0.875rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: rgba(255, 255, 255, 0.4);
}

.action-btn-yellow {
  width: 100%;
  padding: 1rem;
  border-radius: 999px;
  background: #facc15;
  color: #0a0e27;
  font-weight: 700;
  font-size: 1rem;
  border: 0;
  cursor: pointer;
  display: block;
  transition:
    opacity 0.2s,
    transform 0.1s;
}
.action-btn-yellow:hover {
  opacity: 0.92;
}
.action-btn-yellow:active {
  transform: scale(0.98);
}

.action-btn-white {
  width: 100%;
  padding: 1rem;
  border-radius: 999px;
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
  display: block;
  margin-bottom: 0.75rem;
  transition:
    background 0.2s,
    border-color 0.2s;
}
.action-btn-white:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.6);
}

.page-slide-enter-active,
.page-slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.page-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.page-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
