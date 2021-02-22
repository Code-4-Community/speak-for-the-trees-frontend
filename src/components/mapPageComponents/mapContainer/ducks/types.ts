import { C4CState } from '../../../../store';
import { ThunkAction } from 'redux-thunk';
import { BlockGeoDataAction, NeighborhoodGeoDataAction } from './actions';
import { ApiExtraArgs } from '../../../../api/apiClient';
import { AsyncRequest } from '../../../../utils/asyncRequest';

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
  block_id: number; // does not match linting
  lat: number;
  lng: number;
}

export interface BlockGeoDataReducerState {
  readonly blockGeoData: AsyncRequest<BlockGeoData, any>;
}

export type BlockGeoDataThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  BlockGeoDataAction
>;

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
  neighborhood_id: number;
  name: string;
  completion_perc: number;
  lat: number;
  lng: number;
}

export interface NeighborhoodGeoDataReducerState {
  readonly neighborhoodGeoData: AsyncRequest<NeighborhoodGeoData, any>;
}

export type NeighborhoodGeoDataThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  NeighborhoodGeoDataAction
>;

// ---------------------------------Shared Types----------------------------------------

interface MapGeometry {
  type: string;
  coordinates: Coordinate[][][];
}

type Coordinate = [number, number];
