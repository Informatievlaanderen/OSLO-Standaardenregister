import { type Standard } from '~/types/standard'
import type { JsonLdGraph } from '~/types/standard-jsonld'
import { BASEPATH, JSONLD } from '~/constants/constants'
import { serverQueryContent } from '#content/server'
import { buildJsonLd } from '~/services/standards-jsonld.service'

export default defineEventHandler(async (event) => {
  // Fetch all standards
  const standards = await serverQueryContent<Standard>(event, BASEPATH)
    .where({
      _extension: 'json',
      _path: { $regex: `^/standaarden/.*/nl/configuration$` },
    })
    .find()

  // Build JSON-LD
  const ld: JsonLdGraph = buildJsonLd(standards)

  // Set appropriate headers
  setHeader(event, 'Content-Type', JSONLD)

  return ld
})
