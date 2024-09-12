import { validateLocaleCookie } from '~/utils/i18n.utils'

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp()
  const cookie = useCookie('i18n_redirected')

  if (!cookie.value) return

  // Validate the locale cookie
  const validLocale = validateLocaleCookie(
    cookie.value,
    nuxtApp.$i18n.defaultLocale,
    nuxtApp.$i18n.availableLocales,
  )

  // Set the locale to the valid locale or default locale
  const localeToSet = validLocale || nuxtApp.$i18n.defaultLocale

  try {
    await nuxtApp.$i18n.setLocale(localeToSet)
  } catch (error) {
    console.error('Error setting locale:', error)
  }
})
