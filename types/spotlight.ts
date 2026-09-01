import type { NavigationLink } from '~/types/navigationLink'

export interface Spotlight {
  title?: string
  subtitle?: string
  links?: NavigationLink[]
  localizeLinks?: boolean
}
