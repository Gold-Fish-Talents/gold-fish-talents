<template>
  <header class="fixed left-0 right-0 top-4 z-50 mx-auto mt-4 w-full max-w-6xl px-4">
    <nav class="relative z-20 flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm shadow-lg backdrop-blur-xl">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="font-semibold rounded-full bg-white/10 px-4 py-1 text-base tracking-wide"> Logo </NuxtLink>
      </div>

      <ul class="hidden items-center gap-6 text-xs font-regular md:flex">
        <li>
          <NuxtLink to="/services" class="hover:text-primary-400">Services</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/talents/featured" class="hover:text-primary-400">Featured Talents</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/work" class="hover:text-primary-400">Our Work</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/about" class="hover:text-primary-400">About</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact" class="hover:text-primary-400">Contact</NuxtLink>
        </li>
      </ul>
      <NuxtLink to="/jobs/post" class="font-semibold rounded-full bg-white/15 px-4 py-2 text-xs text-white shadow-md backdrop-blur-md hover:bg-white/25"> Post a job </NuxtLink>
    </nav>
  </header>
</template>
