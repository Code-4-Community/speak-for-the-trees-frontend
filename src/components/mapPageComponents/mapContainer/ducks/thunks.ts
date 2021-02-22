import {
  BlockGeoData,
  BlockGeoDataThunkAction,
  NeighborhoodGeoData,
  NeighborhoodGeoDataThunkAction,
} from './types';
import { blockGeoData, neighborhoodGeoData } from './actions';

export const getBlockGeoData = (): BlockGeoDataThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(blockGeoData.loading());
    return apiClient
      .getBlockGeoData()
      .then((response: BlockGeoData) => {
        dispatch(blockGeoData.loaded(response));
      })
      .catch((error: any) => {
        dispatch(blockGeoData.failed(error));
      });
  };
};

export const getNeighborhoodGeoData = (): NeighborhoodGeoDataThunkAction<
  void
> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(neighborhoodGeoData.loading());
    return apiClient
      .getNeighborhoodGeoData()
      .then((response: NeighborhoodGeoData) => {
        dispatch(neighborhoodGeoData.loaded(response));
      })
      .catch((error: any) => {
        dispatch(neighborhoodGeoData.failed(error));
      });
  };
};
