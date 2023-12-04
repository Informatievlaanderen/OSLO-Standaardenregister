import { FilterType, type FilterOption, type SanitizedFilter, type FilterValue } from '~/types/custom-filter'
import type { Standard } from '~/types/standard'
import { ALL } from '~/constants/constants'

export const sanitizeFilters = (filters: FilterOption[], activeFilters: Array<string[]>): SanitizedFilter => {
    let sanitizedFilter: SanitizedFilter = {}
    activeFilters?.forEach((activeFilter: any, i: number) => {
        let val: string | undefined;
        // filters[i]?.key = key to filter file of each standard
        let key: string = filters[i]?.key;
        // Checkbox value can be an array of booleans, so we need to loop through each boolean to check its value. If true, add it to to the filtervalues
        if (filters[i]?.type === FilterType.CHECKBOX) {
            const allowedVals: Array<string> = []
            filters[i]?.options.forEach((value: FilterValue, ii: number) => {
                if (activeFilter[ii]) {
                    allowedVals.push(value.key)
                }
            })
            if ((allowedVals?.length && key) && val !== ALL) {
                sanitizedFilter = { ...sanitizedFilter, [key]: allowedVals }
            }
        } else if (activeFilter) {
            // filters[i]?.options[activeFilter].key  = Value as defined by the selected radio/checkbox
            // Minus one needed since the first option is not the same as the first index of the array
            val = filters[i]?.options[(activeFilter - 1)].key
        }
        if ((val && key) && val !== ALL) {
            sanitizedFilter = { ...sanitizedFilter, [key]: [val] }
        }
    })
    return sanitizedFilter;
}

export const useFilter = (data: Array<Standard>, filters: SanitizedFilter) => {
    if (!filters || Object.keys(filters)?.length === 0) return data;
    const filteredStandards = data.filter((standard: Standard) => {
        return Object.keys(filters).every((filter: string) => {
            return filters[filter]?.includes(standard[filter]?.toString())
        });
    });
    return filteredStandards
}


