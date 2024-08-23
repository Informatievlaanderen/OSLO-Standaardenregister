import type { NavigationLink } from '~/types/navigationLink'

export enum Usage {
  TBD = 'TBD',
  RECOMMENDED = 'Aanbevolen (vrijwillig)',
  MANDATORY = 'mandatory',
  APPLY_OR_EXPLAIN = 'Pas toe of leg uit',
}

export enum Status {
  DEVELOPMENT = 'standaard-in-ontwikkeling',
  CANDIDATE = 'kandidaat-standaard',
  RECOGNIZED = 'erkende-standaard',
}

export enum Category {
  APPLICATION_PROFILE = 'Applicatieprofiel',
  VOCABULARY = 'Vocabularium',
  IMPLEMENTATION_MODEL = 'Implementatiemodel',
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
