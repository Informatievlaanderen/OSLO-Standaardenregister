export interface KGStandard {
  title: string
  theme: string
  organization: string
  OVO: string | null
  domain: string
  namespaces: KGNameSpace[]
  url: string
}

export interface KGNameSpace {
  uri: string
  isVlaanderen: boolean
}

export interface KGNode extends d3.SimulationNodeDatum {
  id: string
  group: 'title' | 'organization' | 'domain'
  domain?: string
}

export interface KGLink {
  source: string | KGNameSpaceNode
  target: string | KGNameSpaceNode
  value?: number
  domain?: string
}

export interface KGNameSpaceNode extends d3.SimulationNodeDatum {
  id: string
  group: 'standard' | 'namespace'
  domain?: string
  url?: string
  isVlaanderen?: boolean
}

export enum Domain {
  TECHNISCHE_STANDAARD = 'https://data.vlaanderen.be/id/concept/Domein/TechnischeStandaard',
  MOBILITEIT = 'https://data.vlaanderen.be/id/concept/Domein/Mobiliteit',
  OMGEVING = 'https://data.vlaanderen.be/id/concept/Domein/Omgeving',
  WETGEVING = 'https://data.vlaanderen.be/id/concept/Domein/Wetgeving',
  GENERIEK = 'https://data.vlaanderen.be/id/concept/Domein/Generiek',
  CULTUUR = 'https://data.vlaanderen.be/id/concept/Domein/Cultuur',
  ENERGIE = 'https://data.vlaanderen.be/id/concept/Domein/Energie',
  FINANCIEN = 'https://data.vlaanderen.be/id/concept/Domein/Financien',
  WELZIJN = 'https://data.vlaanderen.be/id/concept/Domein/Welzijn',
  ECONOMIE = 'https://data.vlaanderen.be/id/concept/Domein/Economie',
  ONDERWIJS = 'https://data.vlaanderen.be/id/concept/Domein/Onderwijs',
}
