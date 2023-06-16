import {
  BlockGeoData,
  NeighborhoodGeoData,
  MapGeoDataThunkAction,
  SiteGeoData,
} from './types';
import { neighborhoodGeoData, siteGeoData } from './actions';

// TODO: remove dispatches for blockGeoData when doing final code cleanups
// commenting them out for now since they seem to cause an issue with logging in
export const getMapGeoData = (): MapGeoDataThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    // dispatch(blockGeoData.loading());
    dispatch(neighborhoodGeoData.loading());
    dispatch(siteGeoData.loading());
    return Promise.all([
      // apiClient.getBlockGeoData(),
      apiClient.getNeighborhoodGeoData(),
      apiClient.getSiteGeoData(),
    ])
      .then((response: [NeighborhoodGeoData, SiteGeoData]) => {
        // dispatch(blockGeoData.loaded(response[0]));
        dispatch(neighborhoodGeoData.loaded(response[0]));
        dispatch(siteGeoData.loaded(response[1]));
      })
      .catch((error: any) => {
        // dispatch(blockGeoData.failed(error));
        dispatch(neighborhoodGeoData.failed(error));
        dispatch(siteGeoData.failed(error));
      });
  };
};
