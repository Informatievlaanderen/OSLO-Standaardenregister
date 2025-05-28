import { getUsageTranslation, Usage } from '~/types/standard'

export const isVlaanderenUrl = (url: string) => {
  const vlaanderenUrl = 'https://data.vlaanderen.be'
  return url.startsWith(vlaanderenUrl)
}

// Helper function to create anchor tags
const createAnchorElement = (
  url: string | undefined,
  getTextFn: (url: string, t: any) => string,
  translate: Function,
) => {
  return url
    ? `<a href="${url}" target="_blank">${getTextFn(url, translate)}</a>`
    : getUsageTranslation(Usage.TBD, translate)
}
