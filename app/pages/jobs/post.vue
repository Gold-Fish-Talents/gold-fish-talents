<script setup lang="ts">
import type * as z from 'zod'
import { emailFormSchema } from '~~/shared/types/auth'

definePageMeta({
  layout: 'default',
  middleware: ['jobs-guest'],
})

useSeoMeta({
  title: 'Log in — Post a Job | Gold Fish Talents',
  description: 'Sign in to create your talent profile and post your job on Gold Fish Talents.',
})

type EmailFormSchema = z.infer<typeof emailFormSchema>

const { r$ } = useRegleSchema({ email: '', otp: undefined }, emailFormSchema)

function hasFieldError(field: keyof EmailFormSchema) {
  return r$[field]?.$dirty && r$[field].$error
}

interface EmailAuthResponse {
  isSuccess: boolean
  navigateTo?: string
}

const { status, data, error, execute } = useAPI<EmailAuthResponse>('/auth/email', {
  method: 'POST',
  body: () => r$.$value,
  immediate: false,
  watch: false,
})

const showOTP = ref(false)
const isOTPSent = computed(() => showOTP.value || data.value?.isSuccess)
const isMockMode = computed(() => import.meta.dev && !isOTPSent.value)

async function onEmailSignIn() {
  const { valid } = await r$.$validate()
  if (!valid || status.value === 'pending') return

  console.log('[Job Post] Executing authentication...')
  await execute()

  console.log('[Job Post] API Response:', {
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
    console.log('[Job Post] OTP Verified but no navigateTo, forcing fallback')
    await navigateTo('/jobs/select')
    return
  }

  // Navigate to the URL returned by the API, or fallback to /jobs/select
  if (data.value?.navigateTo) {
    console.log('[Job Post] Navigating to:', data.value.navigateTo)
    await navigateTo(data.value.navigateTo)
  } else if (data.value?.isSuccess) {
    console.log('[Job Post] Success but no navigateTo, using fallback: /jobs/select')
    await navigateTo('/jobs/select')
  } else if (error.value) {
    console.error('[Job Post] Authentication error:', error.value)
  } else {
    console.warn('[Job Post] Unexpected state, forcing navigation to /jobs/select')
    await navigateTo('/jobs/select')
  }
}
</script>

<template>
  <main class="flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-24 md:py-32">
    <section
      class="flex w-full max-w-[420px] flex-col gap-6 rounded-2xl border border-white/10 bg-dark-500/95 p-8 shadow-2xl ring-1 ring-dark-600 backdrop-blur-sm"
      aria-labelledby="jobs-login-heading">
      <header class="text-center">
        <h1 id="jobs-login-heading" class="text-2xl font-semi-bold text-white">Log in to create your talent profile</h1>
        <p class="mt-2 text-sm text-light-600">Sign in to get started with posting your talent profile</p>
      </header>

      <!-- Google sign-in -->
      <NuxtLink
        to="/auth/google"
        external
        class="font-medium flex w-full items-center justify-center gap-3 rounded-xl border border-white/20 bg-white px-5 py-4 text-base text-black shadow-sm transition-all hover:bg-white/95 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500"
        aria-label="Sign in with Google">
        <NuxtIcon name="local:google" class="size-5 shrink-0" />
        <span>Continue with Google</span>
      </NuxtLink>

      <div class="flex items-center gap-4">
        <span class="h-px flex-1 bg-white/20" />
        <span class="text-xs font-regular text-light-600">or</span>
        <span class="h-px flex-1 bg-white/20" />
      </div>

      <form class="flex flex-col gap-5" novalidate @submit.prevent="onEmailSignIn">
        <div class="flex flex-col gap-3">
          <label for="jobs-email" class="font-medium text-sm text-light-400">Email address</label>
          <input
            id="jobs-email"
            v-model="r$.$value.email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            :disabled="isOTPSent"
            class="w-full rounded-xl border border-white/20 bg-dark-600/50 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
            :aria-invalid="r$.$invalid ? 'true' : 'false'" />
          <p v-if="hasFieldError('email')" class="text-xs text-alert-500">{{ r$.email.$errors[0] }}</p>
        </div>

        <div v-if="isOTPSent" class="flex flex-col gap-3">
          <label for="jobs-otp" class="font-medium text-sm text-light-400">Verification code</label>
          <input
            id="jobs-otp"
            v-model="r$.$value.otp"
            type="text"
            inputmode="numeric"
            autocomplete="one-time-code"
            placeholder="Enter 8-digit code"
            class="w-full rounded-xl border border-white/20 bg-dark-600/50 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
            :aria-invalid="r$.$invalid ? 'true' : 'false'" />
          <p v-if="hasFieldError('otp') || error" class="text-xs text-alert-500">
            {{ r$.otp?.$errors?.[0] || error?.message }}
          </p>
        </div>

        <button
          type="submit"
          :disabled="r$.$invalid || status === 'pending'"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-4 text-base font-semi-bold text-black transition-all hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-dark-500 disabled:cursor-not-allowed disabled:opacity-60">
          <NuxtIcon v-if="status === 'pending'" name="local:loader" class="size-5 animate-spin" />
          {{ isOTPSent && !isMockMode ? 'Verify & continue' : 'Continue with Email' }}
        </button>
      </form>

      <p class="text-center text-xs text-light-600">
        By continuing, you agree to our
        <NuxtLink to="/terms" class="text-primary-400 underline hover:text-primary-400/90">Terms</NuxtLink>
        and
        <NuxtLink to="/privacy" class="text-primary-400 underline hover:text-primary-400/90">Privacy Policy</NuxtLink>.
      </p>
    </section>
  </main>
</template>
