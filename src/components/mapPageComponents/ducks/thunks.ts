import {
  BlockGeoData,
  NeighborhoodGeoData,
  MapGeoDataThunkAction,
} from './types';
import { blockGeoData, neighborhoodGeoData } from './actions';

export const getMapGeoData = (): MapGeoDataThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(blockGeoData.loading());
    dispatch(neighborhoodGeoData.loading());
    return Promise.all([
      apiClient.getBlockGeoData(),
      apiClient.getNeighborhoodGeoData(),
    ])
      .then((response: [BlockGeoData, NeighborhoodGeoData]) => {
        dispatch(blockGeoData.loaded(response[0]));
        dispatch(neighborhoodGeoData.loaded(response[1]));
      })
      .catch((error: any) => {
        dispatch(blockGeoData.failed(error));
        dispatch(neighborhoodGeoData.failed(error));
      });
  };
};
