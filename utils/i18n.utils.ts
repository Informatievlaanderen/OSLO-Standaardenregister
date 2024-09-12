export const validateLocaleCookie = (
  locale: string,
  defaultLocale: string,
  availableLocales: string[],
) => {
  if (locale && availableLocales?.includes(locale)) {
    return locale
  }
  return defaultLocale
}
