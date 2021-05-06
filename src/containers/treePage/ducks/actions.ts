import { genericAsyncActions } from '../../../utils/asyncRequest';
import { SiteProps, StewardshipActivities, AdoptedSites } from './types';

export const siteData = genericAsyncActions<SiteProps, any>();

export const stewardshipActivities = genericAsyncActions<StewardshipActivities, any>();

export const adoptedSites = genericAsyncActions<AdoptedSites, any>();

export type SiteActions =
  | ReturnType<typeof siteData.loading>
  | ReturnType<typeof siteData.loaded>
  | ReturnType<typeof siteData.failed>
  | ReturnType<typeof stewardshipActivities.loading>
  | ReturnType<typeof stewardshipActivities.loaded>
  | ReturnType<typeof stewardshipActivities.failed>;

export type ProtectedSiteActions =
  | ReturnType<typeof adoptedSites.loading>
  | ReturnType<typeof adoptedSites.loaded>
  | ReturnType<typeof adoptedSites.failed>;  
