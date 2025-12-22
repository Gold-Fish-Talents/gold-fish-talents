<!-- components/AppFooter.vue -->
<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()

const columns = [
  {
    title: 'Services',
    links: [
      { title: 'Hire Models', link: '/hire/models' },
      { title: 'Hire Actors', link: '/hire/actors' },
      { title: 'Hire Voice Artists', link: '/hire/voice-artists' },
      { title: 'Hire Composers', link: '/hire/composers' },
      { title: 'Hire Makeup Artists', link: '/hire/makeup-artists' },
    ],
  },
  {
    title: 'Talents',
    links: [
      { title: 'Join as Talent', link: '/talent/join' },
      { title: 'Talent Login', link: '/talent/login' },
      { title: 'Payment Policy', link: '/policy/payments' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About Us', link: '/about' },
      { title: 'Careers', link: '/careers' },
      { title: 'Contact', link: '/contact' },
      { title: 'Press', link: '/press' },
    ],
  },
  {
    title: 'Help',
    links: [
      { title: 'FAQs', link: '/faqs' },
      { title: 'Support', link: '/support' },
      { title: 'Safety Guidelines', link: '/safety' },
    ],
  },
  {
    title: 'Policy & Legal',
    links: [
      { title: 'Privacy Policy', link: '/privacy' },
      { title: 'Client Terms & Conditions', link: '/terms/client' },
      { title: 'Talent Terms & Conditions', link: '/terms/talent' },
      { title: 'Cancellation', link: '/cancellation' },
      { title: 'License', link: '/license' },
    ],
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
            <li v-for="{ title, link } in col.links" :key="link">
              <NuxtLink :to="link" class="hover:text-primary-400">
                {{ title }}
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
