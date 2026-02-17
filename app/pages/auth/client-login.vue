<script setup lang="ts">
import type { z } from 'zod'
import { emailFormSchema } from '~~/shared/types/auth'

definePageMeta({
  layout: false,
  middleware: ['guest'],
})

type EmailFormSchema = z.infer<typeof emailFormSchema>

interface EmailAuthResponse {
  isSuccess: boolean
  navigateTo?: string
}

const { r$ } = useRegleSchema({ email: '', otp: undefined }, emailFormSchema)

function showError(field: keyof EmailFormSchema) {
  return r$[field]?.$dirty && r$[field].$error
}

const { status, data, error, execute } = useAPI<EmailAuthResponse>('/auth/email', {
  method: 'POST',
  body: () => r$.$value,
  immediate: false,
  watch: false,
})

const showOTP = ref(false)
const isOTPSent = computed(() => showOTP.value || data.value?.isSuccess)
const isLoading = computed(() => status.value === 'pending')

async function onSignIn() {
  const { valid } = await r$.$validate()
  if (!valid || isLoading.value) return

  console.log('[Client Login] Executing authentication...')
  await execute()

  console.log('[Client Login] API Response:', {
    status: status.value,
    data: data.value,
    error: error.value,
  })

  // If OTP sent successfully AND we are not yet showing OTP field, show it
  if (data.value?.isSuccess && !data.value?.navigateTo && !showOTP.value) {
    showOTP.value = true
    return
  }

  // If we are already showing OTP and it was successful, but no navigateTo, force fallback
  if (showOTP.value && data.value?.isSuccess && !data.value?.navigateTo) {
    console.log('[Client Login] OTP Verified but no navigateTo, forcing fallback')
    await navigateTo('/jobs/post-job')
    return
  }

  // Navigate to the URL returned by the API
  if (data.value?.navigateTo) {
    console.log('[Client Login] Navigating to:', data.value.navigateTo)
    // Force clients to go to post-job page instead of talent dashboard
    if (data.value.navigateTo.includes('dashboard') || data.value.navigateTo.includes('create')) {
      await navigateTo('/jobs/post-job')
    } else {
      await navigateTo(data.value.navigateTo)
    }
  } else if (data.value?.isSuccess) {
    console.log('[Client Login] Success but no navigateTo, using fallback: /jobs/post-job')
    await navigateTo('/jobs/post-job')
  } else if (error.value) {
    console.error('[Client Login] Authentication error:', error.value)
  }
}

function onOauthSignIn() {
  console.log('Google sign in requested')
}

// Placeholder images for design
const leftImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60',
]

const rightImages = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60',
]
</script>

<template>
  <main class="relative flex min-h-screen w-full overflow-hidden bg-[#030719]">
    <!-- Space Background -->
    <SpaceBackground />

    <AppHeader class="!fixed !bg-transparent !backdrop-blur-none" />

    <div class="container mx-auto flex h-screen items-center justify-center px-4 pt-20">
      <!-- Left Images Column -->
      <div class="hidden h-full flex-col justify-center gap-6 lg:flex">
        <div
          v-for="(img, idx) in leftImages"
          :key="idx"
          class="h-48 w-48 overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
          :class="{ 'translate-x-8': idx === 1 }">
          <!-- Stagger effect -->
          <img :src="img" alt="Talent" class="h-full w-full object-cover" />
        </div>
      </div>

      <!-- Login Card -->
      <section class="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <h2 class="font-semibold mb-2 text-xl text-white">Email Address</h2>

        <form class="flex flex-col gap-5" novalidate @submit.prevent="onSignIn">
          <!-- Email -->
          <div class="group relative">
            <input
              v-model="r$.$value.email"
              type="email"
              placeholder="Enter your email"
              :disabled="isOTPSent"
              class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-[#0B1025]/60 py-3.5 pl-4 pr-4 text-white transition-all focus:border-primary-400 focus:bg-[#0B1025]/80 focus:outline-none focus:ring-1 focus:ring-primary-400"
              :class="{ '!border-red-500': showError('email') }" />
            <span v-if="showError('email')" class="text-red-500 absolute -bottom-5 left-0 text-xs">{{ r$.email.$errors[0] }}</span>
          </div>

          <!-- OTP Field -->
          <div v-if="isOTPSent">
            <h2 class="font-semibold mb-2 text-xl text-white">Enter OTP</h2>
            <div class="group relative">
              <input
                v-model="r$.$value.otp"
                type="password"
                placeholder="Enter OTP code"
                class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-[#0B1025]/60 py-3.5 pl-4 pr-4 text-white transition-all focus:border-primary-400 focus:bg-[#0B1025]/80 focus:outline-none focus:ring-1 focus:ring-primary-400"
                :class="{ '!border-red-500': showError('otp') }" />
              <span v-if="showError('otp') || error" class="text-red-500 absolute -bottom-5 left-0 text-xs">{{ r$.otp?.$errors?.[0] || error?.message }}</span>
            </div>
          </div>

          <!-- Sign In Button -->
          <button
            type="submit"
            class="mt-4 w-full rounded-full bg-[#FFD400] py-3.5 text-center font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            :disabled="isLoading">
            <span v-if="!isLoading">{{ isOTPSent ? 'Verify OTP' : 'Continue with Email' }}</span>
            <span v-else>Loading...</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="text-gray-400 my-6 flex items-center gap-4 text-sm">
          <div class="h-px flex-1 bg-white/10"></div>
          <span>or continue with</span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <!-- Social Buttons -->
        <div class="flex flex-col gap-3">
          <NuxtLink
            to="/auth/google"
            external
            class="font-medium flex w-full items-center justify-center gap-3 rounded-full bg-white py-3 text-black transition-transform hover:scale-[1.02]"
            @click="onOauthSignIn">
            <!-- Google Icon Mock -->
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="h-5 w-5" alt="Google" />
            Continue with Google
          </NuxtLink>

          <button class="font-medium flex w-full items-center justify-center gap-3 rounded-full bg-[#1877F2] py-3 text-white transition-transform hover:scale-[1.02]">
            <!-- Facebook Icon Mock -->
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="h-5 w-5 rounded-full bg-white" alt="Facebook" />
            Continue with Facebook
          </button>
        </div>

        <!-- Footer -->
        <div class="text-gray-400 mt-8 text-center text-sm">Don't have an account? <NuxtLink to="/auth/register" class="font-semibold text-[#FFD400] hover:underline">Sign Up</NuxtLink></div>
      </section>

      <!-- Right Images Column -->
      <div class="hidden h-full flex-col justify-center gap-6 lg:flex">
        <div
          v-for="(img, idx) in rightImages"
          :key="idx"
          class="h-48 w-48 overflow-hidden rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
          :class="{ 'translate-x-[-2rem]': idx === 1 }">
          <!-- Stagger effect -->
          <img :src="img" alt="Talent" class="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Optional: Hide scrollbar for cleaner look */
::-webkit-scrollbar {
  width: 0px;
}
</style>
