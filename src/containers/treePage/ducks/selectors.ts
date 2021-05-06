import { asyncRequestIsComplete, AsyncRequest } from '../../../utils/asyncRequest';
import { StewardshipActivities, AdoptedSites, TreeCare } from './types';

export const mapStewardshipToTreeCare = (
  items: AsyncRequest<StewardshipActivities, any>,
): TreeCare[] => {
  if (asyncRequestIsComplete(items)) {
    return items.result.activities.map((item) => {
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