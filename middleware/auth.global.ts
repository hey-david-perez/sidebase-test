export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.path.startsWith('/clients/')) {
    return
  }

  const authenticated = useCookie('user')

  if (!authenticated.value) {
    return navigateTo('/login')
  }
})
