type JsonLdBase = { '@id': string }

export interface JsonLdContext {
  xsd: string
  dcterms: string
  adms: string
  m8g: string
  foaf: string
  vann: string
}

export interface JsonLdValue {
  '@value': string
  '@language'?: string
  '@type'?: string
}

export type JsonLdReference = JsonLdBase

export interface JsonLdTextDigitalDocument extends JsonLdBase {
  '@type': 'schema:TextDigitalDocument' | 'dcterms:Standard'
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
}

export interface JsonLdGraph {
  '@context': JsonLdContext
  '@graph': JsonLdTextDigitalDocument[]
}
