import type { NavigationLink } from '~/types/navigationLink'

export enum Usage {
  TBD = "TBD",
  RECOMMENDED = "Aanbevolen (vrijwillig)",
  MANDATORY = "Verplicht",
  APPLY_OR_EXPLAIN = "Pas toe of leg uit",
}
export enum Category {
  APPLICATION_PROFILE = "Applicatieprofiel",
  VOCABULARY = "Vocabularium",
  IMPLEMENTATION_MODEL = "Implementatiemodel",
}

export interface Standard {
  [key: string]: string | NavigationLink[] | Object
  title: string,
  category: Category,
  usage: Usage,
  status: string,
  descriptionFileName: string,
  responsibleOrganisation: NavigationLink,
  publicationDate: string,
  specificationDocuments: NavigationLink[],
  documentation: NavigationLink[],
  reports: NavigationLink[],
  charter: Object,
  presentations: NavigationLink[],
  dateOfRegistration: string,
  dateOfAcknowledgementByWorkingGroup: string,
  dateOfAcknowledgementBySteeringCommittee: string,
  _path: string
}
