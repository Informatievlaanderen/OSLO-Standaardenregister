export interface KGStandard {
  title: string
  theme: string
  organization: string
  OVO: string | null
  domain: string
}

export interface KGNode extends d3.SimulationNodeDatum {
  id: string
  group: 'title' | 'organization' | 'domain'
  domain?: string
}

export interface KGLink {
  source: string
  target: string
  value?: number
  domain?: string
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
