import type { LocationQuery } from '#vue-router'
import {
  FilterType,
  type FilterOption,
  type SanitizedFilter,
} from '~/types/custom-filter'

const updateFilter = (filter: FilterOption, indexOption: number) => {
  let updatedFilter = { ...filter }

  if (filter.type === FilterType.RADIO) {
    updatedFilter.active = (indexOption + 1)?.toString()
  }

  if (filter.type === FilterType.CHECKBOX && Array.isArray(filter.active)) {
    let vals: (boolean | string)[] = [...filter.active]
    vals.splice(indexOption, 1, true)
    updatedFilter.active = vals
  }

  return updatedFilter
}

export const convertQueryParams = (
  query: LocationQuery,
  filters: FilterOption[],
): {
  sanitized: SanitizedFilter
  filters: FilterOption[]
} => {
  let updatedFilters: FilterOption[] = [...filters]
  let sanitizedFilter: SanitizedFilter = {}

  for (let key in query) {
    // Hardcoded fix to map type to usage. The label in the table from the fronend is 'type' but the key in the filter is 'usage'
    const value = query[key]
    if (key === 'type') {
      key = 'usage'
    }
    console.log(key)
    console.log(key)
    console.log(key)
    let filter = filters.find((filter) => filter.key === key)

    if (filter) {
      let index = filters?.indexOf(filter)
      let indexOption = filter?.options.findIndex(
        (option) =>
          option?.key?.toLowerCase() === value?.toString()?.toLowerCase(),
      )

      if (index >= 0 && indexOption >= 0 && key) {
        sanitizedFilter = {
          ...sanitizedFilter,
          [key]: [filter?.options[indexOption].key],
        }
        updatedFilters[index] = updateFilter(filter, indexOption)
      }
    }
  }

  return {
    sanitized: sanitizedFilter,
    filters: updatedFilters,
  }
}
