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

// ---------------------------------Shared Types----------------------------------------

interface MapGeometry {
  type: string;
  coordinates: Coordinate[][][];
}

type Coordinate = [number, number];

export interface MapGeoDataReducerState {
  readonly blockGeoData: AsyncRequest<BlockGeoData, any>;
  readonly neighborhoodGeoData: AsyncRequest<NeighborhoodGeoData, any>;
}

export type MapGeoDataThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  MapActions
>;
