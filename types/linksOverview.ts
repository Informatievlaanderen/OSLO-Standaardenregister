import type { NavigationLink } from '~/types/navigationLink'

interface NestedNavigationLink extends NavigationLink {
    children?: NavigationLink[]
}

export interface OverviewLinks {
    links?: NestedNavigationLink[]

}