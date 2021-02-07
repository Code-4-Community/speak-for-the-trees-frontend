import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { BlockGeoDataAction, NeighborhoodGeoDataAction } from './actions';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { AsyncRequest } from '../../../utils/asyncRequest';

// ---------------------------------Blocks----------------------------------------

/*
  INTERFACES FOR RESPONSES FROM BACKEND
*/

interface BlockGeoResponse {
  type: string;
  name: string;
  features: BlockFeatureResponse[];
}

interface BlockFeatureResponse {
  type: string;
  properties: BlockFeaturePropertiesResponse;
  geometry: MapGeometry;
};

interface BlockFeaturePropertiesResponse {
  block_id: number; // does not match linting
  lat: number;
  lng: number;
};

/*
  INTERFACES FOR FRONTEND
*/

export interface BlockGeoData {
  type: string;
  name: string;
  features: BlockFeature[];
}

interface BlockFeature {
  type: string;
  properties: BlockFeatureProperties;
  geometry: MapGeometry;
};

interface BlockFeatureProperties {
  blockId: number; // correct case
  lat: number;
  lng: number;
};

export const blockResponseToFrontend = (response: BlockGeoResponse): BlockGeoData => {
  return {
    ...response,
    features: response.features.map((feature) => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          blockId: feature.properties.block_id
        }
      }
    })
  }
}

export interface BlockGeoDataReducerState {
  readonly blockGeoData: AsyncRequest<BlockGeoData, any>;
}

export type BlockGeoDataThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  BlockGeoDataAction
>;

// ---------------------------------Neighborhoods----------------------------------------

/*
  INTERFACES FOR RESPONSES FROM BACKEND
*/

interface NeighborhoodGeoResponse {
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

/*
  INTERFACES FOR FRONTEND
*/

export interface NeighborhoodGeoData {
  type: string;
  name: string;
  features: NeighborhoodFeature[];
}

interface NeighborhoodFeature {
  type: string;
  properties: NeighborhoodFeatureProperties;
  geometry: MapGeometry;
}

interface NeighborhoodFeatureProperties {
  neighborhoodId: number;
  name: string;
  completionPerc: number;
  lat: number;
  lng: number;
}

export const neighborhoodResponseToFrontend = (response: NeighborhoodGeoResponse): NeighborhoodGeoData => {
  return {
    ...response,
    features: response.features.map((feature) => {
      return {
        ...feature,
        properties: {
          ...feature.properties,
          neighborhoodId: feature.properties.neighborhood_id,
          completionPerc: feature.properties.completion_perc,
        }
      }
    })
  }
}

export interface NeighborhoodGeoDataReducerState {
  readonly neighborhoodGeoData: AsyncRequest<NeighborhoodGeoData, any>;
}

export type NeighborhoodGeoDataThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  NeighborhoodGeoDataAction
>;

// ---------------------------------Shared Types----------------------------------------

interface MapGeometry {
  type: string;
  coordinates: Coordinate[][][];
};

type Coordinate = [
  number, number
];