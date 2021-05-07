import { asyncRequestIsComplete, AsyncRequest } from '../../../utils/asyncRequest';
import { StewardshipActivities, AdoptedSites, TreeCare, SiteProps, Entry, SiteEntryNames } from './types';

export const mapStewardshipToTreeCare = (
  items: AsyncRequest<StewardshipActivities, any>,
): TreeCare[] => {
  if (asyncRequestIsComplete(items)) {
    return items.result.stewardshipActivities.map((item) => {
      const month = item.date.toLocaleString('default', { month: 'long' });
      const day = item.date.getDate();

      return {
        date: `${month} ${day}th`,
        message: `Was ${item.cleaned && "cleared of waste and "}${item.mulched && "mulched and "}${item.watered && "watered and "}${item.weeded && "weeded"}.`
      };
    });
  }
  return [];
};

export const getLatestEntry = (
  items: AsyncRequest<SiteProps, any>,
): Entry[] => {
  if (asyncRequestIsComplete(items)) {
    return Object.entries(items.result.entries[0]).reduce<Entry[]>((soFar, [key, value]) => {
      if(SiteEntryNames[key] && value !== null) {
        soFar.push({
          title: SiteEntryNames[key],
          value: value.toString()
        });
      }
      return soFar;
    }, [])
  }
  return []
}

export const isTreeAdopted = (
  items: AsyncRequest<AdoptedSites, any>,
  siteId: number
): boolean => {
  if (asyncRequestIsComplete(items)) {
    return items.result.adoptedSites.includes(siteId);
  } else {
    return false;
  }
}