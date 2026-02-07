export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useUserSession()

  if (loggedIn.value) {
    return navigateTo(user.value?.isProfileComplete ? '/talents/models/dashboard' : '/jobs/create')
  }
})
