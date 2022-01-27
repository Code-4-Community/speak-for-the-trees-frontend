import { genericAsyncActions } from '../../../utils/asyncRequest';
import { BlockGeoData, NeighborhoodGeoData, SiteGeoData } from './types';

export const blockGeoData = genericAsyncActions<BlockGeoData, any>();

export const neighborhoodGeoData = genericAsyncActions<
  NeighborhoodGeoData,
  any
>();

export const siteGeoData = genericAsyncActions<SiteGeoData, any>();

export type MapActions =
  | ReturnType<typeof blockGeoData.loading>
  | ReturnType<typeof blockGeoData.loaded>
  | ReturnType<typeof blockGeoData.failed>
  | ReturnType<typeof neighborhoodGeoData.loading>
  | ReturnType<typeof neighborhoodGeoData.loaded>
  | ReturnType<typeof neighborhoodGeoData.failed>
  | ReturnType<typeof siteGeoData.loading>
  | ReturnType<typeof siteGeoData.loaded>
  | ReturnType<typeof siteGeoData.failed>;
