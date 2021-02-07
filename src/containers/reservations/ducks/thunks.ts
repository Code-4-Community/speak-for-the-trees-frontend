import {
  BlockGeoData,
  BlockGeoDataThunkAction,
  NeighborhoodGeoData,
  NeighborhoodGeoDataThunkAction,
} from './types';
import { blockGeoData, neighborhoodGeoData } from './actions';

export const getBlockGeoData = (): BlockGeoDataThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(blockGeoData.loading());
    return protectedApiClient
      .getBlockGeoData()
      .then((response: BlockGeoData) => {
        dispatch(blockGeoData.loaded(response));
      })
      .catch((error: any) => {
        dispatch(blockGeoData.failed(error));
      });
  };
};

export const getNeighborhoodGeoData = (): NeighborhoodGeoDataThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(neighborhoodGeoData.loading());
    return protectedApiClient
      .getNeighborhoodGeoData()
      .then((response: NeighborhoodGeoData) => {
        dispatch(neighborhoodGeoData.loaded(response));
      })
      .catch((error: any) => {
        dispatch(neighborhoodGeoData.failed(error));
      });
  };
};