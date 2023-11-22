import type { NavigationLink } from '~/types/navigationLink'

enum Usage {
    TBD = "TBD",
    RECOMMENDED = "Aanbevolen (vrijwillig)",
    MANDATORY = "Verplicht",
    APPLY_OR_EXPLAIN = "Pas toe of leg uit",
}

export interface Standard {
    [index: string]: string | NavigationLink[] | NavigationLink | object ;
    title: string,
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