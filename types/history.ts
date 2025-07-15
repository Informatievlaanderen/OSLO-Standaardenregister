export interface TimelineEvent {
  date: string
  standard: string
  type: 'registration' | 'acknowledgement'
  domain?: string
  organization?: string
}
