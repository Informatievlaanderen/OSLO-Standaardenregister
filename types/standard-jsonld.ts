type JsonLdBase = { '@id': string }

export interface JsonLdContext {
  xsd: 'http://www.w3.org/2001/XMLSchema#'
  dcterms: 'http://purl.org/dc/terms/'
  adms: 'http://www.w3.org/ns/adms#'
  m8g: 'http://data.europa.eu/m8g/'
  foaf: 'http://xmlns.com/foaf/0.1/'
  vann: 'http://purl.org/vocab/vann/'
  vcard: 'http://www.w3.org/2006/vcard/ns#'
  dcat: 'http://www.w3.org/ns/dcat#'
}

export interface JsonLdValue {
  '@value': string
  '@language'?: string
  '@type'?: string
}

export interface JsonLdAssetDistribution {
  '@type': 'adms:AssetDistribution'
  'dcat:downloadURL': JsonLdReference
  'dcat:mediaType': JsonLdReference
  'dcterms:title': JsonLdValue
}

export type JsonLdReference = JsonLdBase

export interface JsonLdTextDigitalDocument extends JsonLdBase {
  '@type':
    | string[]
    | 'schema:TextDigitalDocument'
    | 'dcterms:Standard'
    | 'adms:Asset'
  'dcterms:language': JsonLdReference
  'schema:name'?: JsonLdValue
  'schema:creativeWorkStatus'?: JsonLdReference
  'schema:datePublished'?: JsonLdValue
  'schema:author'?: JsonLdReference
  'schema:additionalType'?: JsonLdReference[]
  'foaf:homepage'?: JsonLdReference
  'dcterms:identifier'?: JsonLdValue | string
  'dcterms:title'?: JsonLdValue
  'adms:status'?: JsonLdReference
  'dcterms:created'?: JsonLdValue
  'dcterms:modified'?: JsonLdValue
  'dcterms:issued'?: JsonLdValue
  'dcterms:creator'?: JsonLdReference
  'm8g:contactPoint'?: JsonLdReference
  'dcterms:type'?: JsonLdReference[]
  'vann:preferredNamespaceUri'?: JsonLdReference
  'dcterms:publisher'?: JsonLdReference
  'dcat:distribution'?: JsonLdAssetDistribution[]
}

export interface JsonLdGraph {
  '@context': JsonLdContext
  '@graph': JsonLdTextDigitalDocument[]
}
