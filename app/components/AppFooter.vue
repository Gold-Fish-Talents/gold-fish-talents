<template>
  <footer class="round relative flex w-full flex-col items-center gap-4 px-4 py-6 text-white">
    <ul class="grid grid-flow-col grid-cols-4 grid-rows-3 gap-y-2 whitespace-nowrap">
      <li>
        <NuxtLink to="/terms">Terms</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/privacy">Privacy</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/cancellation">Cancellation</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/license">License</NuxtLink>
      </li>
      <!-- Social Media -->
      <li class="col-span-2 col-start-3 row-start-3 flex justify-end gap-3 fill-white">
        <NuxtLink aria-label="whatsapp" to="https://wa.me/c/919433128726" target="_blank" external>
          <NuxtIcon name="local:whatsapp" class="text-[28px] md:text-[40px]" />
        </NuxtLink>

        <NuxtLink aria-label="instagram" to="https://www.instagram.com/goldfishtalents" target="_blank" external>
          <NuxtIcon name="local:instagram" class="text-[28px] md:text-[40px]" />
        </NuxtLink>

        <NuxtLink aria-label="facebook" to="https://www.facebook.com/goldfishtalents" target="_blank" external>
          <NuxtIcon name="local:facebook" class="text-[28px] md:text-[40px]" />
        </NuxtLink>

        <NuxtLink aria-label="linkedin" to="https://www.linkedin.com/company/gold-fish-talents" target="_blank" external>
          <NuxtIcon name="local:linkedin" class="text-[28px] md:text-[40px]" />
        </NuxtLink>

        <NuxtLink aria-label="youtube" to="https://www.youtube.com/@gold_fish_talents" target="_blank" external>
          <NuxtIcon name="local:youtube" class="text-[28px] md:text-[40px]" />
        </NuxtLink>
        <NuxtLink aria-label="google" to="https://maps.app.goo.gl/a5RZtb1rxHC8MoaY6" target="_blank" external>
          <NuxtIcon name="local:map" class="text-[28px] md:text-[40px]" />
        </NuxtLink>
      </li>
    </ul>
    <div class="w-full border-t border-dark-600" />
    <NuxtLink to="https://shirsendu-bairagi.dev" target="__blank" class="flex items-center gap-1">
      <span>Made by</span>
      <NuxtIcon name="local:shba007" filled class="text-[20px]" />
    </NuxtLink>
    <span class="text-xs">&copy; Gold Fish Talents 2025. All rights reserved.</span>
  </footer>
</template>
