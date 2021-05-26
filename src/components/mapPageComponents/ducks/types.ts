import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { MapActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';

// ---------------------------------Blocks----------------------------------------

export interface BlockGeoData {
  type: string;
  name: string;
  features: BlockFeatureResponse[];
}

interface BlockFeatureResponse {
  type: string;
  properties: BlockFeaturePropertiesResponse;
  geometry: MapGeometry;
}

interface BlockFeaturePropertiesResponse {
  blockId: number; // does not match linting
  lat: number;
  lng: number;
}

// ---------------------------------Neighborhoods----------------------------------------

export interface NeighborhoodGeoData {
  type: string;
  name: string;
  features: NeighborhoodFeatureResponse[];
}

interface NeighborhoodFeatureResponse {
  type: string;
  properties: NeighborhoodFeaturePropertiesResponse;
  geometry: MapGeometry;
}

interface NeighborhoodFeaturePropertiesResponse {
  neighborhoodId: number;
  name: string;
  completionPerc: number;
  lat: number;
  lng: number;
}

// ---------------------------------Sites----------------------------------------

export interface SiteGeoData {
  type: string;
  name: string;
  features: SiteFeatureResponse[];
}

interface SiteFeatureResponse {
  type: string;
  properties: SiteFeaturePropertiesResponse;
  geometry: MapGeometry;
}

export interface SiteFeaturePropertiesResponse {
  id: number;
  treePresent: boolean;
  diameter: number;
  species: string;
  updatedAt: string;
  updatedBy: string;
  address: string;
  lat: number;
  lng: number;
}

// ---------------------------------Shared Types----------------------------------------
// These types follow the GeoJSON format: https://tools.ietf.org/html/rfc7946

interface MapGeometry {
  type: string;
  coordinates: Coordinate[][][] | Coordinate;
}

type Coordinate = [number, number];

// ---------------------------------Redux----------------------------------------

export interface MapGeoDataReducerState {
  readonly blockGeoData: AsyncRequest<BlockGeoData, any>;
  readonly neighborhoodGeoData: AsyncRequest<NeighborhoodGeoData, any>;
  readonly siteGeoData: AsyncRequest<SiteGeoData, any>;
}

export type MapGeoDataThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  MapActions
>;

// ---------------------------------Map----------------------------------------

// The different map views and zoom value the associated data layer appears at
export enum MapViews {
  BLOCKS = 13,
  TREES = 15,
}
