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

export interface Standard {
    [index: string]: string | NavigationLink[] | NavigationLink | object;
    title: string,
    state: State,
    href: string,
    category: string,
    description: string,
    organisation: NavigationLink,
    datePublished: string,
    usageType: Usage,
    specificationDocuments: NavigationLink[],
    relatedDocuments: NavigationLink[],
    reportsWorkgroups: NavigationLink[],
    presentationsAndOthers: NavigationLink[],
    details: {
        functionalScope: string,
        organizationalScope: string,
        dateRegistration: string,
        datePublicReviewEnding: string,
        dateRecognitionWorkgroup: string,
        dateRecognitionFlemishICTPolicy: string,
    },
    questionsAndFeedback: {
        email: string,
        githubQuestions: NavigationLink,
    }
}