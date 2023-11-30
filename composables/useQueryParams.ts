import type { LocationQuery } from "#vue-router";
import { FilterType, type FilterOption, type SanitizedFilter } from "~/types/custom-filter";
import type { Standard } from '~/types/standard'

export const useQueryParams = (data: Array<Standard>, query: LocationQuery): Array<Standard> => {
    const filteredStandards = data.filter((standard: Standard) => {
        for (let key in query) {
            if (standard[key] === undefined || standard[key]?.toString()?.toLowerCase() != query[key]?.toString()?.toLowerCase())
                return false;
        }
        return true;
    });
    return filteredStandards;
};

export const convertQueryParams = (query: LocationQuery, filters: FilterOption[]): {
    sanitized: SanitizedFilter,
    filters: FilterOption[],
} => {
    let updatedFilters: FilterOption[] = [...filters]
    let sanitizedFilter: SanitizedFilter = {};
    for (let key in query) {
        // check to see if the key from the query param is a valid filter value
        let filter: FilterOption | undefined = filters.find((filter) => filter.key === key);
        if (filter) {
            let index: number | undefined = filters?.indexOf(filter);
            let indexOption: number | undefined = filter?.options.findIndex((option) => {
                return option?.key === query[key]
            })

            if (index >= 0 && indexOption >= 0 && key && filter) {
                sanitizedFilter = { ...sanitizedFilter, [key]: [filter?.options[indexOption].key] }

                // overwrite active value for radio button from the query params
                if (filter.type === FilterType.RADIO) {
                    let updatedFilter: FilterOption = { ...filter, active: (indexOption + 1)?.toString() }
                    updatedFilters[index] = updatedFilter
                }
                // make sure we're dealing with an array type since active can be a string for radiobuttons
                if (filter.type === FilterType.CHECKBOX && Array.isArray(filter.active)) {
                    let vals: (boolean | string)[] = [...filter.active];
                    vals.splice(indexOption, 1, true)
                    let updatedFilter: FilterOption = { ...filter, active: vals }
                    updatedFilters[index] = updatedFilter
                }
            }
        }
    }

    return {
        sanitized: sanitizedFilter,
        filters: updatedFilters,
    };

}