import type { NavigationLink } from '~/types/navigationLink'

export enum Usage {
    TBD = "TBD",
    RECOMMENDED = "Aanbevolen (vrijwillig)",
    MANDATORY = "Verplicht",
    APPLY_OR_EXPLAIN = "Pas toe of leg uit",
}

export enum State {
    DEVELOPMENT = "standaard-in-ontwikkeling",
    CANDIDATE = "kandidaat-standaard",
    RECOGNIZED = "erkende-standaard",
}

export enum Category {
    APPLICATION_PROFILE = "Applicatieprofiel",
    VOCABULARY = "Vocabularium",
    IMPLEMENTATION_MODEL = "Implementatiemodel",
}

export interface Standard {
    // [index: string]: string | NavigationLink[] | NavigationLink | object;
    title: string,
    category: Category,
    usage: Usage,
    uri: string,
    state: State,
    descriptionFileName: string,
    responsibleOrganisation: NavigationLink,
    publicationDate: string,
    specificationDocuments: NavigationLink[],
    documentation: NavigationLink[],
    reports: NavigationLink[],
    charter: Object,
    presentations: NavigationLink[],
    dateOfRegistration: "",
    dateOfAcknowledgementByWorkingGroup: "",
    dateOfAcknowledgementBySteeringCommittee: "",
    details: {
        functionalScope: string,
        organizationalScope: string,
    },
    questionsAndFeedback: {
        email: string,
        githubQuestions: NavigationLink,
    }
}