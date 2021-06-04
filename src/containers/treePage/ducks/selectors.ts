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
  SiteEntryNames,
} from './types';
import { formatDateSuffix } from '../../../utils/stringFormat';

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

export const getLatestEntry = (
  items: AsyncRequest<SiteProps, any>,
): Entry[] => {
  if (asyncRequestIsComplete(items)) {
    return Object.entries(items.result.entries[0]).reduce<Entry[]>(
      (soFar, [key, value]) => {
        if (SiteEntryNames[key] && (value || value === false)) {
          soFar.push({
            title: SiteEntryNames[key],
            value: value.toString(),
          });
        }
        return soFar;
      },
      [],
    );
  }
  return [];
};

export const isTreeAdopted = (
  items: AsyncRequest<AdoptedSites, any>,
  siteId: number,
): boolean => {
  if (asyncRequestIsComplete(items)) {
    return items.result.adoptedSites.includes(siteId);
  } else {
    return false;
  }
};
