export interface Statistics {
  numberOfTerms: number
  numberOfStandardsConfigured: number
  reportErrors: number
  reportsMissing: number
  uniqueContributors: number
  uniqueAffiliations: number
  standards: StatisticStandard[]
}

export interface StatisticStandard {
  standard: string
  publicationDate: string
  status: string
  totalPeople: number
  contributors: Affiliate[]
}

interface Affiliate {
  affiliation: string
  count: number
}
