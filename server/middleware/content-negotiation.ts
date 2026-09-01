import { JSONLD } from '~/constants/constants'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const acceptHeader = getHeader(event, 'accept') ?? ''

  // Check if client accepts JSON-LD via extension or Accept header
  let apiPath: string | null = null
  let shouldReturnJsonLd = false

  // Check for .jsonld extension
  const extensionMatch = url.pathname.match(/^\/standaarden.jsonld$/)
  if (extensionMatch) {
    shouldReturnJsonLd = true
    apiPath = '/api/standaarden'
  }

  // Check for Accept header (only if extension wasn't matched)
  if (!shouldReturnJsonLd && acceptHeader.includes('application/ld+json')) {
    // Only handle /standaarden path
    if (url.pathname === '/standaarden' || url.pathname === '/standaarden/') {
      shouldReturnJsonLd = true
      apiPath = '/api/standaarden'
    }
  }

  if (!shouldReturnJsonLd || !apiPath) {
    return
  }

  try {
    // Fetch from API with JSON-LD accept header
    const content = await $fetch<string>(apiPath, {
      headers: {
        Accept: JSONLD,
      },
    })

    setHeader(event, 'Content-Type', `${JSONLD}; charset=utf-8`)
    setHeader(event, 'Cache-Control', 'public, max-age=3600')
    setResponseStatus(event, 200)

    return content
  } catch (err) {
    console.error('Error fetching JSON-LD content:', err)
    // Don't throw, let it fall through to the Vue page
    return
  }
})
