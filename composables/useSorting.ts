import type { Standard } from '~/types/standard'

const compare = (a: Standard, b: Standard) => {
    // -1 if the date is an invalid date. FE: "TBD"
    return (Date.parse(b?.datePublished) || -1) - (Date.parse(a?.datePublished) || -1)
}

export const useSorting = (data: Array<Standard>): Array<Standard> => {
    return data?.sort(compare);
}


