<!-- components/AppFooter.vue -->
<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()

const columns = [
  {
    title: 'Services',
    links: ['Hire Models', 'Hire Actors', 'Hire Voice Artists', 'Hire Composers', 'Hire Makeup Artists'],
  },
  {
    title: 'Talents',
    links: ['Join as Talent', 'Talent Login', 'Payment Policy'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Contact', 'Press'],
  },
  {
    title: 'Help',
    links: ['FAQs', 'Support', 'Safety Guidelines'],
  },
  {
    title: 'Policy & Legal',
    links: ['Privacy Policy', 'Terms & Conditions', 'Content Guidelines'],
  },
]
</script>

<template>
  <footer class="relative w-screen border-t border-white/10 bg-[#020617] text-white" :class="props.class">
    <div class="mx-auto max-w-6xl px-4 py-12">
      <h2 class="font-semibold text-center text-xl tracking-[0.2em] text-white/80">DISCOVER, HIRE, CREATE.</h2>
      <p class="mt-2 text-center text-xs text-light-600">Start hiring today.</p>

      <div class="mt-10 grid gap-8 text-sm text-light-600 md:grid-cols-5">
        <div v-for="col in columns" :key="col.title" class="space-y-3">
          <p class="font-semibold text-xs uppercase text-white/80">
            {{ col.title }}
          </p>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link">
              <NuxtLink to="/" class="hover:text-primary-400">
                {{ link }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex items-center justify-between text-xs text-light-600">
        <p>© {{ new Date().getFullYear() }} Gold Fish Talents. All rights reserved.</p>
        <p>Made among the stars.</p>
      </div>
    </div>
  </footer>
</template>
