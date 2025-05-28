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
