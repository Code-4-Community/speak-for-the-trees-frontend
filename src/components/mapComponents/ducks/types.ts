import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { MapActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';
import { BasicTreeInfo } from '../../treePopup';

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
  lat: number;
  lng: number;
  plantingDate?: number;
  adopterId?: string;
  commonName?: string;
  address?: string;
}

// ---------------------------------Shared Types----------------------------------------
// These types follow the GeoJSON format: https://tools.ietf.org/html/rfc7946

interface MapGeometry {
  type: string;
  coordinates: Coordinate[][][] | Coordinate;
}

export type Coordinate = [number, number];

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

export interface BasicMapData {
  readonly map: google.maps.Map;
  readonly zoom: number;
  readonly markersArray: google.maps.Marker[];
}

// Data given to initMap functions to set up map features outside of LOADER.load().then()
export interface InitMapData extends BasicMapData {
  readonly popPopup: (latLng: google.maps.LatLng) => void;
  readonly setActiveTreeInfo: (info: BasicTreeInfo) => void;
}

// Map data layers and listeners
export interface MapLayersAndListeners {
  readonly privateStreetsLayer: google.maps.Data;
  readonly neighborhoodsLayer: google.maps.Data;
  readonly blocksLayer?: google.maps.Data;
  readonly sitesLayer?: google.maps.Data;
  zoomListener: google.maps.MapsEventListener; // mutable to allow parent components to unload/assign new zoom event listeners
}

// Data returned to the map after initMap functions are called
export interface ReturnMapData extends BasicMapData, MapLayersAndListeners {
  readonly searchMarker: google.maps.Marker;
}
