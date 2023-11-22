import type { LocationQuery } from "#vue-router";
import type { Standard } from '~/types/standard'

export const useFilter = (data: Array<Standard>, filter: LocationQuery) => {
    const filteredStandards = data.filter((standard: Standard) => {
        for (let key in filter) {
            if (standard[key] === undefined || standard[key]?.toString()?.toLowerCase() != filter[key]?.toString()?.toLowerCase())
                return false;
        }
        return true;
    });
    return filteredStandards;

};