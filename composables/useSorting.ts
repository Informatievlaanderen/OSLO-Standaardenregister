import type { Standard } from '~/types/standard'
import { parse, isValid } from 'date-fns'
import type { Sorting } from '~/types/sorting'

export type SortingKey = 'title' | 'publicationDate'

export enum SortingDirection {
  'ASC' = 1,
  'DESC' = -1,
}

export const compareKey =
  (sortingObj: Sorting) =>
  (a: Standard, b: Standard): number => {
    if (sortingObj.key === 'publicationDate')
      return comparePubDate(a, b, sortingObj.value)
    const valueA = a[sortingObj.key]
    const valueB = b[sortingObj.key]

    return sortingObj.value * (valueA < valueB ? -1 : valueA > valueB ? 1 : 0)
  }

const comparePubDate = (a: Standard, b: Standard, direction: number) => {
  try {
    // Define the possible date formats
    const formats = ['yyyy-MM-dd', 'dd/MM/yyyy', 'MM/dd/yyyy', 'dd-mm-yyyy']

    let dateA, dateB

    // Try to parse a.publicationDate using each format
    for (const format of formats) {
      if (a?.publicationDate === undefined) break
      dateA = parse(a?.publicationDate, format, new Date())
      if (isValid(dateA)) break
    }

    // Try to parse b.publicationDate using each format
    for (const format of formats) {
      if (b?.publicationDate === undefined) break
      dateB = parse(b?.publicationDate, format, new Date())
      if (isValid(dateB)) break
    }

    // Check if the dates are valid
    const dateATime = isValid(dateA) ? dateA?.getTime() ?? -Infinity : -Infinity
    const dateBTime = isValid(dateB) ? dateB?.getTime() ?? -Infinity : -Infinity

    return direction * (dateBTime - dateATime)
  } catch (err) {
    // if error, log it and return to output them at the end
    console.error(err)
    return -1
  }
}

export const useSorting = (
  data: Array<Standard>,
  sortCompare: (a: Standard, b: Standard) => number,
): Array<Standard> => {
  return data?.sort(sortCompare)
}
