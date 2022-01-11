import { Entry, MainSiteEntryOrder } from '../containers/treePage/ducks/types';

/**
 * Converts the given dollar amount to a formatted string
 * @param amount the amount to convert
 */
export function getMoneyString(amount: number): string {
  return `$${amount.toLocaleString('en-us', { maximumFractionDigits: 2 })}`;
}

/**
 * Converts the given date to a formatted string
 * @param date the date to convert
 */
export function getDateString(date: Date): string {
  return `${new Intl.DateTimeFormat('en-US').format(date)}`;
}

/**
 * Returns the numeric date formatted with the appropriate suffix.
 * @param date the numeric day to format
 */
export function formatDateSuffix(date: number): string {
  const tensNum: number = date % 100;
  if (tensNum > 9 && tensNum < 20) {
    return date + 'th';
  }

  const lastNumber: number = date % 10;
  switch (lastNumber) {
    case 1:
      return date + 'st';
    case 2:
      return date + 'nd';
    case 3:
      return date + 'rd';
    default:
      return date + 'th';
  }
}

/**
 * Returns the shorthand name of the neighborhoods
 * @param name the name to shorten
 * @param shortHandNames the dictionary containing the mappings
 */
export function shortHand(
  name: string,
  shortHandNames: { [key: string]: string },
): string {
  return shortHandNames[name] || name;
}

/**
 * Translates true/false to Yes/No strings
 * @param str the string to translate
 */
export function booleanToString(str: string): string {
  switch (str) {
    case 'true':
      return 'Yes';
    case 'false':
      return 'No';
    default:
      return str;
  }
}

/**
 * Compares 2 main entries and returns the relative position of the first to the second.
 * @param e1 the first entry
 * @param e2 the second entry
 */
export function compareMainEntries(e1: Entry, e2: Entry): number {
  if (MainSiteEntryOrder[e1.title] < MainSiteEntryOrder[e2.title]) {
    return -1;
  } else {
    return 1;
  }
}

/**
 * If both are present in the given list of entries, combines genus and species into a scientific name.
 * @param entries the list of entries
 */
export function combineScientificName(entries: Entry[]): Entry[] {
  const newEntries: Entry[] = [];
  let species;
  let genus;
  entries.forEach((entry: Entry) => {
    switch (entry.title) {
      case 'Species':
        species = entry.value;
        break;
      case 'Genus':
        genus = entry.value;
        break;
      default:
        newEntries.push(entry);
        break;
    }
  });
  if (species && genus) {
    newEntries.push({ title: 'Scientific Name', value: `${genus} ${species}` });
  } else if (species) {
    newEntries.push({ title: 'Species', value: species });
  } else if (genus) {
    newEntries.push({ title: 'Genus', value: genus });
  }

  return newEntries;
}

/**
 * Returns the error message of the given error.
 * @param err the error
 */
export function getErrorMessage(err: any): string {
  return `${err?.response?.data || 'Error encountered'}`;
}
