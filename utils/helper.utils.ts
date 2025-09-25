import { getUsageTranslation, Usage } from '~/types/standard'

export const isVlaanderenUrl = (url: string) => {
  const vlaanderenUrl = 'https://data.vlaanderen.be'
  return url.startsWith(vlaanderenUrl)
}

// Helper function to create anchor tags
export const createAnchorElement = (
  url: string | undefined,
  getTextFn: (url: string, t: Function) => string,
  t: any,
) => {
  if (!url) {
    return getUsageTranslation(Usage.TBD, t)
  }

  const translatedText = getTextFn(url, t)

  // Check if the translation is valid (not TBD)
  if (translatedText === getUsageTranslation(Usage.TBD, t)) {
    return `<p>${translatedText}</p>`
  }
  return `<a href="${url}" target="_blank">${translatedText}</a>`
}

export const getLocalizedHref = (
  href: string,
  locale: string,
  defaultLocale: string,
): string => {
  // Check if the href already ends with a file extension or has a trailing slash
  const hasFileExtension = /\.[a-zA-Z]{2,4}$/.test(href)
  const hasTrailingSlash = href.endsWith('/')

  // Remove trailing slash if present for consistent processing
  const cleanHref = hasTrailingSlash ? href.slice(0, -1) : href

  // If it already has a file extension, don't modify
  if (hasFileExtension) {
    return href
  }

  if (locale === defaultLocale) {
    return cleanHref
  }

  // Append the localized index file
  return `${cleanHref}/index_${locale}.html`
}
