<script setup lang="ts">
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const route = useRoute()
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false
  }
)
</script>

<template>
  <header class="fixed left-0 right-0 top-0 z-50 mx-auto w-full px-4 pt-4">
    <nav class="relative mx-auto flex max-w-6xl items-center justify-between rounded-lg border border-white/10 bg-white/5 px-6 py-3 shadow-lg backdrop-blur-xl md:rounded-2xl">
      <NuxtLink to="/" class="px-4 py-1.5 text-xl font-semi-bold text-white transition-colors md:text-2xl"> Logo </NuxtLink>
      <!-- Desktop Navigation -->
      <ul class="hidden items-center gap-8 md:flex">
        <li>
          <NuxtLink to="/services" class="text-sm font-regular text-white transition-colors hover:text-primary-400"> Services </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/talents/featured" class="text-sm font-regular text-white transition-colors hover:text-primary-400"> Featured Talents </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/work" class="text-sm font-regular text-white transition-colors hover:text-primary-400"> Our Work </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="text-sm font-regular text-white transition-colors hover:text-primary-400"> About </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="text-sm font-regular text-white transition-colors hover:text-primary-400"> Contact </NuxtLink>
        </li>
      </ul>
      <NuxtLink to="/jobs/post" class="hidden rounded-full bg-white/15 px-11 py-4 text-base font-semi-bold text-white shadow-md backdrop-blur-md transition-colors hover:bg-white/25 md:block">
        Post a job
      </NuxtLink>
      <button class="flex size-10 items-center justify-center transition-colors md:hidden" aria-label="Toggle menu" @click="toggleMobileMenu">
        <NuxtIcon v-if="!isMobileMenuOpen" name="local:hamburger" class="size-7 text-white" />
        <NuxtIcon v-else name="local:cross" class="size-7 text-white" />
      </button>
    </nav>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95">
      <div v-if="isMobileMenuOpen" class="mx-auto mt-2 max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-lg backdrop-blur-xl md:hidden">
        <ul class="flex flex-col gap-1 p-3">
          <li>
            <NuxtLink to="/services" class="block rounded-xl px-4 py-3 text-sm font-regular text-white transition-colors hover:bg-white/10"> Services </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/talents/featured" class="block rounded-xl px-4 py-3 text-sm font-regular text-white transition-colors hover:bg-white/10"> Featured Talents </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/work" class="block rounded-xl px-4 py-3 text-sm font-regular text-white transition-colors hover:bg-white/10"> Our Work </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="block rounded-xl px-4 py-3 text-sm font-regular text-white transition-colors hover:bg-white/10"> About </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" class="block rounded-xl px-4 py-3 text-sm font-regular text-white transition-colors hover:bg-white/10"> Contact </NuxtLink>
          </li>
          <li class="mt-2 px-2">
            <NuxtLink to="/jobs/post" class="block rounded-full bg-white/15 px-5 py-3 text-center text-sm font-semi-bold text-white shadow-md backdrop-blur-md transition-colors hover:bg-white/25">
              Post a job
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
