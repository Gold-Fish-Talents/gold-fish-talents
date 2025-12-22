<template>
  <div class="flex min-h-screen w-screen flex-col items-center justify-start">
    <LazyAppHeader hydrate-on-idle />
    <main class="relative isolate mx-auto flex w-full grow flex-col gap-4 overflow-hidden px-2 md:mb-8 md:px-4">
      <slot />
    </main>
    <LazyAppFooter hydrate-on-visible class="mt-16 md:mt-24" />
  </div>
</template>
