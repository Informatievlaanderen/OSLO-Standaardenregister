type JsonLdBase = { '@id': string }

export interface JsonLdContext {
  schema: string
  xsd: string
}

export interface JsonLdValue {
  '@value': string
  '@language'?: string
  '@type'?: string
}

export type JsonLdReference = JsonLdBase

export interface JsonLdTextDigitalDocument extends JsonLdBase {
  '@type': 'schema:TextDigitalDocument'
  'schema:name'?: JsonLdValue
  'schema:creativeWorkStatus'?: JsonLdReference
  'schema:datePublished'?: JsonLdValue
  'schema:author'?: JsonLdReference
  'schema:additionalType'?: JsonLdReference[]
}

export interface JsonLdGraph {
  '@context': JsonLdContext
  '@graph': JsonLdTextDigitalDocument[]
}
