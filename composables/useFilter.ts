import { FilterType } from '~/types/custom-filter'
import type { FilterOption, SanitizedFilter } from '~/types/custom-filter'
import type { Standard } from '~/types/standard'
import { ALL } from '~/constants/constants'

const sanitizeCheckboxFilter = (filter: FilterOption, activeFilter: any) => {
  const allowedVals: Array<string> = filter.options
    .filter((_, index) => activeFilter[index])
    .map((value) => value.key)

  return allowedVals.length > 0 && filter.key !== ALL
    ? { [filter.key]: allowedVals }
    : {}
}

const sanitizeOtherFilter = (filter: FilterOption, activeFilter: any) => {
  const val = filter.options[activeFilter - 1]?.key
  return val && filter.key !== ALL ? { [filter.key]: [val] } : {}
}

export const sanitizeFilters = (
  filters: FilterOption[],
  activeFilters: Array<string[]>,
): SanitizedFilter => {
  let sanitizedFilter: SanitizedFilter = {}

  activeFilters.forEach((activeFilter, i) => {
    const filter = filters[i]
    if (!filter) return

    if (filter.type === FilterType.CHECKBOX) {
      sanitizedFilter = {
        ...sanitizedFilter,
        ...sanitizeCheckboxFilter(filter, activeFilter),
      }
    } else if (activeFilter) {
      sanitizedFilter = {
        ...sanitizedFilter,
        ...sanitizeOtherFilter(filter, activeFilter),
      }
    }
  })

  return sanitizedFilter
}

export const useFilter = (data: Array<Standard>, filters?: SanitizedFilter) => {
  if (!filters || Object.keys(filters).length === 0) return data

  return data.filter((standard: Standard) => {
    return Object.keys(filters).every((filter: string) => {
      // If the value is "all values", dont filter on this key
      if (filters[filter].includes(ALL)) return true
      // Special handling for organisation filter: responsibleOrganisation is an array of objects with a 'resourceReference' property
      if (filter === 'organisation') {
        const organisationRefs = standard.responsibleOrganisation?.map(
          (org) => {
            // Normalize to canonical URI for matching
            const match = org.resourceReference?.match(
              /https?:\/\/data\.vlaanderen\.be\/(id|doc)\/organisatie\/(\S+)/,
            )
            return match
              ? `https://data.vlaanderen.be/id/organisatie/${match[2]}`
              : org.resourceReference ?? ''
          },
        ) ?? []
        return filters[filter].some((selectedOrg) =>
          organisationRefs.includes(selectedOrg),
        )
      }
      return filters[filter]?.includes(standard[filter]?.toString())
    })
  })
}
