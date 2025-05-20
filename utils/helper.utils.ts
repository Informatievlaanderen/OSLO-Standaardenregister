export const isVlaanderenUrl = (url: string) => {
  const vlaanderenUrl = 'https://data.vlaanderen.be'
  return url.startsWith(vlaanderenUrl)
}
