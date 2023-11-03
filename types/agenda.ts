export interface AgendaItem {
    title?: string
    startDate?: string;
    endDate?: string;
    campaignTitle?: string;
    registrationLink?: string;
    location: string;
}

export interface MarcomAgenda {
    id?: string
    title?: string
    summary?: string
    summaryTitle?: string
    startDate?: string
    endDate?: string
    physicalLocation?: string
    status?: string
    type?: string
    themeId?: string
    entityId?: string
    entity?: string
    registrationForm?: string
    campaignId?: string
    campaignTitle?: string
    registrationDeadlineDate?: string
    created?: string
    updated?: string
}