export default defineNuxtRouteMiddleware(async () => {

  const nuxtApp = useNuxtApp()
  const cookie = useCookie('i18n_redirected');

  await nuxtApp.$i18n.setLocale(cookie.value || nuxtApp.$i18n.defaultLocale)
})
