export enum TimelineEventType {
  Registration = 'registration',
  Acknowledgement = 'acknowledgement',
  PublicReviewStart = 'publicReviewStart',
  WorkingGroupAcknowledgement = 'workingGroupAcknowledgement',
}

export interface TimelineEvent {
  date: string
  standard: string
  type: TimelineEventType
  domain?: string
  organization?: string
  year: number
  link?: string
}
