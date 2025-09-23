<template>
  <!-- The JSON-LD data is embedded within a script tag with type "application/ld+json" -->
</template>
<script setup lang="ts">
import { type Standard, Usage } from '~/types/standard'
import type {
  JsonLdGraph,
  JsonLdTextDigitalDocument,
} from '~/types/standard-jsonld'

const props = defineProps({
  standards: {
    type: Array<Standard>,
  },
})

const buildJsonLd = (standards: Standard[]): JsonLdGraph => {
  const ld: JsonLdGraph = {
    '@context': {
      dcterms: 'http://purl.org/dc/terms/',
      adms: 'http://www.w3.org/ns/adms#',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
    },
    '@graph': [],
  }

  standards?.forEach((standard: Standard) => {
    /*
     * Create an entry in the graph if at least an IRI is provided for the specification.
     * All other properties are optional and added if provided to avoid that a misconfiguration
     * of a single specification would break the registry
     */
    if (standard.specificationDocuments[0]?.resourceReference) {
      const element: JsonLdTextDigitalDocument = {
        '@id': standard.specificationDocuments[0].resourceReference,
        '@type': 'dcterms:Standard',
      }

      element['dcterms:identifier'] = standard.specificationDocuments[0].resourceReference;

      if (standard.title.length > 0) {
        element['dcterms:title'] = {
          '@value': standard.title,
          '@language': 'nl',
        }
      }

      if (standard.status) {
        element['adms:status'] = {
          '@id': standard.status,
        }
      }

      if (standard.publicationDate && standard.publicationDate !== Usage.TBD) {
        element['dcterms:created'] = {
          '@value': standard.publicationDate,
          '@type': 'xsd:dateTime',
        }
      }

      if (
        standard.responsibleOrganisation.length > 0 &&
        standard.responsibleOrganisation[0].resourceReference
      ) {
        element['dcterms:creator'] = {
          '@id': standard.responsibleOrganisation[0].resourceReference,
        }
      }

      if (standard.category && standard.category.startsWith('https://')) {
        if (!element['dcterms:type']) {
          element['dcterms:type'] = []
        }
        element['dcterms:type'].push({
          '@id': standard.category,
        })
      }

      ld['@graph'].push(element)
    }
  })

  return ld
}

// Prevent multiple re-computations of the JSON-LD string on render changes
const jsonLdString = computed(() => {
  if (!props.standards?.length) return ''
  return JSON.stringify(buildJsonLd(props.standards), null, 2)
})

useServerHead({
  script: [
    {
      id: 'standards-jsonld',
      type: 'application/ld+json',
      innerHTML: jsonLdString,
      tagPosition: 'bodyOpen',
    },
  ],
})
</script>
