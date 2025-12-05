import type { UseFetchOptions } from 'nuxt/app'

export function useAPI<T>(url: string | (() => string), opts?: UseFetchOptions<T> | undefined) {
  return useFetch(url, {
    ...opts,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}
