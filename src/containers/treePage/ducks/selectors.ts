import { createSelector } from 'reselect';
import {
  asyncRequestIsComplete,
  AsyncRequest,
} from '../../../utils/asyncRequest';
import {
  StewardshipActivities,
  AdoptedSites,
  TreeCare,
  SiteProps,
  Entry,
  MainSiteEntryNames,
  ExtraSiteEntryNames,
  SplitSiteEntries,
} from './types';
import {
  booleanToString,
  combineScientificName,
  compareMainEntries,
  formatDateSuffix,
  shortHand,
} from '../../../utils/stringFormat';
import { UNABBREVIATED_MONTHS } from '../../../assets/content';
import { sortByMonthYear } from '../../../utils/sort';

export const mapStewardshipToTreeCare = (
  items: AsyncRequest<StewardshipActivities, any>,
): TreeCare[] => {
  if (asyncRequestIsComplete(items)) {
    return items.result.stewardshipActivities.map((item) => {
      const year = new Date(item.date).getFullYear();
      const month = new Date(item.date).toLocaleString('default', {
        month: 'short',
      });
      const day = new Date(item.date).getDate();

      const activityStrings = [];
      if (item.cleaned) activityStrings.push('cleared of waste');
      if (item.mulched) activityStrings.push('mulched');
      if (item.watered) activityStrings.push('watered');
      if (item.weeded) activityStrings.push('weeded');
      return {
        date: `${month} ${formatDateSuffix(day)}`,
        year,
        message: `Was ${activityStrings.join(' and ')}.`,
      };
    });
  }
  return [];
};

export const getLatestSplitEntry = (
  items: AsyncRequest<SiteProps, any>,
): SplitSiteEntries => {
  return {
    main: combineScientificName(getLatestEntry(items, MainSiteEntryNames)).sort(
      compareMainEntries,
    ),
    extra: getLatestEntry(items, ExtraSiteEntryNames),
  };
};

export const getLatestEntry = (
  items: AsyncRequest<SiteProps, any>,
  namesList: Record<string, string>,
): Entry[] => {
  if (asyncRequestIsComplete(items)) {
    return Object.entries(items.result.entries[0]).reduce<Entry[]>(
      (soFar, [key, value]) => {
        if (namesList[key] && (value || value === false)) {
          soFar.push({
            title: namesList[key],
            value: booleanToString(value.toString()),
          });
        }
        return soFar;
      },
      [],
    );
  }
  return [];
};

export const isTreeAdoptedByUser = (
  items: AsyncRequest<AdoptedSites, any>,
  siteId: number,
): boolean => {
  if (asyncRequestIsComplete(items)) {
    return items.result.adoptedSites.includes(siteId);
  } else {
    return false;
  }
};

export const mapStewardshipToMonthYearOptions = createSelector(
  [mapStewardshipToTreeCare],
  (stewardship: TreeCare[]): { label: string; value: string }[] => {
    const monthYearOptions = stewardship
      // turn the filtered array into an array of labels and values
      .map((entry) => {
        return {
          label:
            shortHand(entry.date.substring(0, 3), UNABBREVIATED_MONTHS) +
            ' ' +
            entry.year,
          value: entry.date.substring(0, 3) + ' ' + entry.year,
        };
      })
      // append the current month and year to the options list
      .concat([
        {
          label: new Date().toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          }),
          value: new Date().toLocaleString('default', {
            month: 'short',
            year: 'numeric',
          }),
        },
      ])
      // remove activities with duplicate year and date
      .filter(
        (entry, index, self) =>
          index === self.findIndex((e) => e.value === entry.value),
      );
    // sort options by both month and year
    return monthYearOptions.sort(sortByMonthYear);
  },
);
