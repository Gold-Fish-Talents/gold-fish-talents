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
  <footer class="sm:py-18 relative min-h-screen w-screen overflow-hidden px-6 py-14 text-white lg:py-24" :class="props.class">
    <div aria-hidden="true" class="absolute inset-0 bg-[url('/images/moon-landing.png')] bg-contain bg-bottom bg-no-repeat md:bg-cover md:bg-[center_60%]" />
    <div class="relative mx-auto mb-16 w-full max-w-[90rem]">
      <h2 class="font-semibold text-center text-3xl uppercase tracking-[0.12em] text-white/85 sm:text-5xl sm:tracking-[0.16em] lg:text-7xl lg:tracking-[0.2em]">Discover, Hire, Create.</h2>

      <p class="mt-4 text-center text-sm uppercase sm:mt-6 sm:text-base lg:text-2xl">Start hiring today</p>

      <div class="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 text-sm text-white/60 sm:grid-cols-3 lg:mt-28 lg:grid-cols-5">
        <div v-for="{ title, links } in columns" :key="title" class="space-y-5">
          <p class="font-semibold text-xs uppercase text-white/80">
            {{ title }}
          </p>

          <ul class="space-y-4">
            <li v-for="{ title: linkTitle, link } in links" :key="link">
              <NuxtLink :to="link" class="whitespace-nowrap transition-colors hover:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/60">
                {{ linkTitle }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
