import { Usage, type Standard } from '~/types/standard'
import type {
  JsonLdGraph,
  JsonLdTextDigitalDocument,
} from '~/types/standard-jsonld'

export const buildJsonLd = (standards: Standard[]): JsonLdGraph => {
  const ld: JsonLdGraph = {
    '@context': {
      dcterms: 'http://purl.org/dc/terms/',
      adms: 'http://www.w3.org/ns/adms#',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      m8g: 'http://data.europa.eu/m8g/',
      foaf: 'http://xmlns.com/foaf/0.1/',
      vann: 'http://purl.org/vocab/vann/',
      vcard: 'http://www.w3.org/2006/vcard/ns#',
      dcat: 'http://www.w3.org/ns/dcat#',
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
        '@type': ['adms:Asset', 'dcterms:Standard'],
        'dcterms:language': {
          '@id':
            'http://publications.europa.eu/resource/authority/language/NLD',
        },
        'foaf:homepage': {
          '@id': standard.specificationDocuments[0].resourceReference,
        },
      }

      element['dcterms:identifier'] =
        standard.specificationDocuments[0].resourceReference

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

      element['dcat:distribution'] = [
        {
          '@type': 'adms:AssetDistribution',
          'dcterms:title': { '@value': 'HTML format', '@language': 'nl' },
          'dcat:downloadURL': {
            '@id': standard.specificationDocuments[0].resourceReference,
          },
          'dcat:mediaType': {
            '@id': 'http://www.iana.org/assignments/media-types/text/html',
          },
        },
        {
          '@type': 'adms:AssetDistribution',
          'dcterms:title': { '@value': 'RDF Turtle format', '@language': 'nl' },
          'dcat:downloadURL': {
            '@id': standard.specificationDocuments[0].resourceReference,
          },
          'dcat:mediaType': {
            '@id': 'http://www.iana.org/assignments/media-types/text/turtle',
          },
        },
      ]

      element['dcterms:publisher'] = {
        '@id': 'https://data.vlaanderen.be/id/organisatie/OVO002949',
      }

      if (standard.publicationDate && standard.publicationDate !== Usage.TBD) {
        element['dcterms:created'] = {
          '@value': standard.publicationDate,
          '@type': 'xsd:date',
        }

        element['dcterms:modified'] = {
          '@value': standard.publicationDate,
          '@type': 'xsd:date',
        }
      }

      // TODO: issued date of the WG?
      if (
        standard.dateOfAcknowledgementBySteeringCommittee &&
        standard.dateOfAcknowledgementBySteeringCommittee !== Usage.TBD
      ) {
        element['dcterms:issued'] = {
          '@value': standard.dateOfAcknowledgementBySteeringCommittee,
          '@type': 'xsd:date',
        }
      }

      if (
        standard.responsibleOrganisation.length > 0 &&
        standard.responsibleOrganisation[0].resourceReference
      ) {
        element['dcterms:creator'] = {
          '@id': standard.responsibleOrganisation[0].resourceReference,
        }

        element['m8g:contactPoint'] = {
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

        /* Vocabularies have a namespace URI, Application Profiles never have them */
        if (
          standard.category ==
          'https://data.vlaanderen.be/id/concept/StandaardType/Vocabularium'
        ) {
          element['vann:preferredNamespaceUri'] = {
            '@id': standard.specificationDocuments[0].resourceReference,
          }
        }
      }

      ld['@graph'].push(element)
    }
  })

  return ld
}
