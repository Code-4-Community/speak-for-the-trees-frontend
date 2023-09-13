import { createSelector } from 'reselect';
import {
  AsyncRequest,
  asyncRequestIsComplete,
} from '../../../utils/asyncRequest';
import { generateTreeCareMessage } from '../../../utils/stringFormat';
import {
  AdoptedSites,
  Entry,
  ExtraSiteEntryNames,
  MainSiteEntryNames,
  SiteProps,
  SplitSiteEntries,
  MonthYearOption,
  StewardshipActivities,
  TreeCare,
  SiteEntryImage,
} from './types';
import {
  booleanToString,
  combineScientificName,
  compareMainEntries,
  formatDateSuffix,
} from '../../../utils/stringFormat';
import { compareByMonthYear } from '../../../utils/compare';

export const mapStewardshipToTreeCare = (
  items: AsyncRequest<StewardshipActivities, any>,
): TreeCare[] => {
  if (asyncRequestIsComplete(items)) {
    return items.result.stewardshipActivities.map((item) => {
      const activityId = item.id;
      const userId = item.userId;
      const year = new Date(item.date).getFullYear();
      const month = new Date(item.date).toLocaleString('default', {
        month: 'short',
      });
      const day = new Date(item.date).getDate();
      return {
        activityId,
        userId,
        day: formatDateSuffix(day),
        month,
        year,
        message: generateTreeCareMessage(item),
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
    if (items.result.entries.length > 0) {
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
    } else {
      return [];
    }
  }
  return [];
};

export const getLatestEntrySiteImages = (
  items: AsyncRequest<SiteProps, any>,
): SiteEntryImage[] => {
  if (asyncRequestIsComplete(items)) {
    return items.result.entries[0]?.images || [];
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
  (stewardship: TreeCare[]): MonthYearOption[] => {
    const monthYearOptions = stewardship
      // turn the filtered array into an array of labels and values
      .map((entry) => {
        return {
          month: entry.month,
          year: entry.year,
        };
      })
      // append the current month and year to the options list
      .concat([
        {
          month: new Date().toLocaleString('default', { month: 'short' }),
          year: new Date().getFullYear(),
        },
      ])
      // remove entries with duplicate month and year
      .filter(
        (entry, index, self) =>
          index ===
          self.findIndex(
            (e) => e.month === entry.month && e.year === entry.year,
          ),
      );
    // sort dates by both month and year in reverse chronological order
    return monthYearOptions.sort(compareByMonthYear).reverse();
  },
);
