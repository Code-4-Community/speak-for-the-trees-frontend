import {
  BlockGeoData,
  NeighborhoodGeoData,
  MapGeoDataThunkAction,
  SiteGeoData,
} from './types';
import { blockGeoData, neighborhoodGeoData, siteGeoData } from './actions';

export const getMapGeoData = (): MapGeoDataThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(blockGeoData.loading());
    dispatch(neighborhoodGeoData.loading());
    dispatch(siteGeoData.loading());
    return Promise.all([
      apiClient.getBlockGeoData(),
      apiClient.getNeighborhoodGeoData(),
      apiClient.getSiteGeoData(),
    ])
      .then((response: [BlockGeoData, NeighborhoodGeoData, SiteGeoData]) => {
        dispatch(blockGeoData.loaded(response[0]));
        dispatch(neighborhoodGeoData.loaded(response[1]));
        dispatch(siteGeoData.loaded(response[2]));
      })
      .catch((error: any) => {
        dispatch(blockGeoData.failed(error));
        dispatch(neighborhoodGeoData.failed(error));
        dispatch(siteGeoData.failed(error));
      });
  };
};
