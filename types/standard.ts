import type { NavigationLink } from '~/types/navigationLink'

export enum Usage {
  TBD = 'TBD',
  RECOMMENDED = 'Aanbevolen (vrijwillig)',
  MANDATORY = 'Verplicht',
  APPLY_OR_EXPLAIN = 'Pas toe of leg uit',
}

export enum Status {
  DEVELOPMENT = 'https://data.vlaanderen.be/id/concept/StandaardStatus/OntwerpStandaard',
  CANDIDATE = 'https://data.vlaanderen.be/id/concept/StandaardStatus/KandidaatStandaard',
  RECOGNIZED = 'https://data.vlaanderen.be/id/concept/StandaardStatus/ErkendeStandaard',
  OUTDATED = 'https://data.vlaanderen.be/id/concept/StandaardStatus/VerouderdeStandaard',
  REPLACED = 'https://data.vlaanderen.be/id/concept/StandaardStatus/VervangenStandaard',
  RECALLED = 'https://data.vlaanderen.be/id/concept/StandaardStatus/HerroepenStandaard',
  NOTA_WORKING_GROUP = 'https://data.vlaanderen.be/id/concept/StandaardStatus/NotaWerkgroep',
}

export enum Category {
  APPLICATION_PROFILE = 'Applicatieprofiel',
  VOCABULARY = 'Vocabularium',
  IMPLEMENTATION_MODEL = 'Implementatiemodel',
}

export const getStatusFromUrl = (
  statusUrl: string,
  translate: Function,
): string => {
  const matchingStatus = Object.values(Status).find(
    (status) => status === statusUrl,
  )
  if (matchingStatus) {
    return getStatusTranslation(matchingStatus, translate)
  }
  return Usage.TBD
}

export const getUsageTranslation = (
  key: Usage,
  translate: Function,
): string => {
  const translations = {
    [Usage.TBD]: 'TBD',
    [Usage.RECOMMENDED]: translate('standard.usage.recommended'),
    [Usage.MANDATORY]: translate('standard.usage.mandatory'),
    [Usage.APPLY_OR_EXPLAIN]: translate('standard.usage.applyOrExplain'),
  }

  return translations[key]
}

export const getStatusTranslation = (
  key: Status,
  translate: Function,
): string => {
  const translations = {
    [Status.DEVELOPMENT]: translate('standard.status.development'),
    [Status.CANDIDATE]: translate('standard.status.candidate'),
    [Status.RECOGNIZED]: translate('standard.status.recognized'),
    [Status.OUTDATED]: translate('standard.status.outdated'),
    [Status.REPLACED]: translate('standard.status.replaced'),
    [Status.RECALLED]: translate('standard.status.recalled'),
    [Status.NOTA_WORKING_GROUP]: translate('standard.status.noteWorkingGroup'),
  }

  return translations[key]
}

export const getCategoryTranslation = (
  key: Category,
  translate: Function,
): string => {
  const translations = {
    [Category.APPLICATION_PROFILE]: translate('applicationProfile'),
    [Category.VOCABULARY]: translate('vocabulary'),
    [Category.IMPLEMENTATION_MODEL]: translate('implementationModel'),
  }

  return translations[key]
}

export interface Standard {
  [key: string]: string | NavigationLink[] | Object
  title: string
  category: Category
  usage: Usage
  status: Status
  descriptionFileName: string
  responsibleOrganisation: NavigationLink[]
  publicationDate: string
  specificationDocuments: NavigationLink[]
  documentation: NavigationLink[]
  reports: NavigationLink[]
  charter: Object
  presentations: NavigationLink[]
  dateOfRegistration: string
  dateOfAcknowledgementByWorkingGroup: string
  dateOfAcknowledgementBySteeringCommittee: string
  datePublicReviewStart: string
  datePublicReviewEnd: string
  endOfPublicationDate: string
  _path: string
}
