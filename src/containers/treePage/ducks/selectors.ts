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
} from '../../../utils/stringFormat';

export const mapStewardshipToTreeCare = (
  items: AsyncRequest<StewardshipActivities, any>,
): TreeCare[] => {
  if (asyncRequestIsComplete(items)) {
    return items.result.stewardshipActivities.map((item) => {
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

export const getSiteAddress = (items: AsyncRequest<SiteProps, any>): string => {
  if (asyncRequestIsComplete(items)) {
    if (items.result.address) {
      return items.result.address;
    } else {
      return '';
    }
  } else {
    return '';
  }
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
