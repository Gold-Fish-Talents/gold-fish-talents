<script setup lang="ts">
interface Company {
  name: string
  logo: string
}

const companies = ref<Company[]>([
  { name: 'Kalp Kaar', logo: 'https://cdn.redcatpictures.com/media/image/f_auto&q_80&progressive_yes&fit_contain&s_512x512/logo-kalp-kaar' },
  { name: 'New Sitala', logo: 'https://cdn.redcatpictures.com/media/image/f_auto&q_80&progressive_yes&fit_contain&s_512x512/logo-new-sitala' },
])
</script>

<template>
  <section class="relative w-full overflow-hidden p-6 md:p-12 lg:p-16">
    <div class="mb-8 flex justify-center md:justify-start">
      <span class="font-medium inline-block rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white/90 backdrop-blur-sm"> Brands We Work With </span>
    </div>
    <h2 class="mb-12 max-w-2xl text-center text-2xl font-bold leading-tight text-white md:text-left md:text-3xl">Trusted by brands, agencies & creators across India.</h2>
    <div class="md:hidden">
      <div class="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        <div v-for="company in companies" :key="company.name" class="flex aspect-[287/109] min-w-[160px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <img :src="company.logo" :alt="company.name" class="size-full object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </div>
    </div>
    <div class="hidden grid-cols-3 gap-6 md:grid lg:grid-cols-4 xl:grid-cols-5">
      <div
        v-for="company in companies"
        :key="company.name"
        class="group flex aspect-[287/109] items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10">
        <img :src="company.logo" :alt="company.name" class="size-full object-contain opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
