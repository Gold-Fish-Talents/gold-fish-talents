<script setup lang="ts">
import type * as z from 'zod'

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

function onOauthSignIn() {
  console.log('Google sign in requested')
}

const { status, data, error, execute } = useAPI<EmailAuthResponse>('/auth/email', {
  method: 'POST',
  body: r$.$value,
  immediate: false,
  watch: false,
})

const isOTPSent = computed(() => data.value?.isSuccess)
const isLoading = computed(() => status.value === 'pending')

async function onEmailSignIn() {
  const { valid } = await r$.$validate()
  if (!valid || isLoading.value) return

  await execute()

  if (data.value?.navigateTo) window.location.href = data.value.navigateTo
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
      <section class="relative z-10 w-full max-w-[420px] rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl" aria-labelledby="login-heading">
        <header>
          <h1 id="login-heading" class="font-semibold mb-2 text-2xl text-white">Welcome to Gold Fish Talents</h1>
          <p class="text-gray-400 mb-6 text-sm">Log in to your account</p>
        </header>

        <!-- Google sign-in -->
        <NuxtLink
          to="/auth/google"
          external
          class="font-medium flex w-full items-center justify-center gap-3 rounded-full bg-white py-3 text-black transition-transform hover:scale-[1.02]"
          aria-label="Sign in with Google"
          @click="onOauthSignIn">
          <NuxtIcon name="local:google" class="text-[18px]" />
          <span class="text-sm">Sign in with Google</span>
        </NuxtLink>

        <!-- Divider -->
        <div class="text-gray-400 my-6 flex items-center gap-4 text-sm">
          <div class="h-px flex-1 bg-white/10"></div>
          <span>or continue with</span>
          <div class="h-px flex-1 bg-white/10"></div>
        </div>

        <form class="flex flex-col gap-5" novalidate @submit.prevent="onEmailSignIn">
          <!-- Email field -->
          <div>
            <label for="email" class="font-medium text-slate-300 mb-2 block text-sm">Email</label>
            <div class="group relative">
              <input
                id="email"
                v-model="r$.$value.email"
                type="email"
                autocomplete="email"
                placeholder="you@email.com"
                :disabled="isOTPSent"
                class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-[#0B1025]/60 py-3.5 pl-4 pr-4 text-white transition-all focus:border-primary-400 focus:bg-[#0B1025]/80 focus:outline-none focus:ring-1 focus:ring-primary-400"
                :class="{ '!border-red-500': showError('email') }"
                :aria-invalid="r$.$invalid ? 'true' : 'false'" />
              <span v-if="showError('email')" class="text-red-500 absolute -bottom-5 left-0 text-xs">{{ r$.email.$errors[0] }}</span>
            </div>
          </div>

          <!-- OTP field -->
          <div v-if="isOTPSent">
            <label for="otp" class="font-medium text-slate-300 mb-2 block text-sm">OTP</label>
            <div class="group relative">
              <input
                id="otp"
                v-model="r$.$value.otp"
                type="password"
                placeholder="Enter OTP code"
                class="placeholder-gray-500 w-full rounded-xl border border-white/10 bg-[#0B1025]/60 py-3.5 pl-4 pr-4 text-white transition-all focus:border-primary-400 focus:bg-[#0B1025]/80 focus:outline-none focus:ring-1 focus:ring-primary-400"
                :class="{ '!border-red-500': showError('otp') }"
                :aria-invalid="r$.$invalid ? 'true' : 'false'" />
              <span v-if="showError('otp') || error" class="text-red-500 absolute -bottom-5 left-0 text-xs">
                {{ r$.otp?.$errors?.[0] || error?.message }}
              </span>
            </div>
          </div>

          <!-- Continue button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#FFD400] py-3.5 text-center font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
            <NuxtIcon v-if="isLoading" name="local:loader" class="text-[24px]" />
            <span v-if="!isLoading">{{ isOTPSent ? 'Verify OTP' : 'Continue with Email' }}</span>
            <span v-else>Loading...</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="text-gray-400 mt-8 text-center text-xs">
          By continuing, you agree to our <NuxtLink to="/terms" class="text-[#FFD400] hover:underline">Terms</NuxtLink> and
          <NuxtLink to="/privacy" class="ml-1 text-[#FFD400] hover:underline">Privacy Policy</NuxtLink>.
        </div>
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
