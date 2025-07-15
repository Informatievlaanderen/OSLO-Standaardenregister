export interface TimelineEvent {
  date: string
  standard: string
  type: 'registration' | 'acknowledgement' | 'publicReviewStart' | 'workingGroupAcknowledgement'
  domain?: string
  organization?: string
}
