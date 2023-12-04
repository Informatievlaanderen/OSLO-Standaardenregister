import type { Standard } from '~/types/standard'

export const useSearch = (data: Array<Standard>, search?: string): Array<Standard> => {
    const filteredStandards = data.filter((standard: Standard) => {
        // Add a plus 2 value to not trigger the search filter needlessly 
        if (!!search?.length && search.length > 2) {
            return standard?.title?.toLowerCase()?.includes(search?.toLowerCase())
        }
        return true;
    });
    return filteredStandards
}


