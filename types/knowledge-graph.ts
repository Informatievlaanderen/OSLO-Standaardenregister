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
  ONBEKEND = 'https://data.vlaanderen.be/id/concept/Domein/Onbekend',
}

export const KGextendedColorScheme: string[] = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
  '#ff6b6b',
  '#4ecdc4',
  '#45b7d1',
  '#96ceb4',
  '#ffeaa7',
  '#dda0dd',
  '#98d8c8',
  '#f7dc6f',
  '#bb8fce',
  '#85c1e9',
  '#f8c471',
  '#82e0aa',
  '#f1948a',
  '#85929e',
  '#a569bd',
  '#5dade2',
  '#58d68d',
  '#f4d03f',
  '#ec7063',
  '#af7ac5',
]
