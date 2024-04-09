import type { Standard } from '~/types/standard'
import { parse, isValid } from 'date-fns';

const compare = (a: Standard, b: Standard) => {
  try {

    // Define the possible date formats
    const formats = ['yyyy-MM-dd', 'dd/MM/yyyy', 'MM/dd/yyyy', 'dd-mm-yyyy'];

    let dateA, dateB;

    // Try to parse a.publicationDate using each format
    for (const format of formats) {
      dateA = parse(a?.publicationDate, format, new Date());
      if (isValid(dateA)) break;
    }

    // Try to parse b.publicationDate using each format
    for (const format of formats) {
      dateB = parse(b?.publicationDate, format, new Date());
      if (isValid(dateB)) break;
    }

    // Check if the dates are valid
    const dateATime = isValid(dateA) ? dateA?.getTime() ?? -Infinity : -Infinity;
    const dateBTime = isValid(dateB) ? dateB?.getTime() ?? -Infinity : -Infinity;

    return dateBTime - dateATime;
  } catch (err) {
    // if error, log it and return to output them at the end
    console.error(err);
    return -1;

  }
}

export const useSorting = (data: Array<Standard>): Array<Standard> => {
  return data?.sort(compare);
}


