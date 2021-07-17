import {
  SiteProps,
  StewardshipActivities,
  AdoptedSites,
  SiteReducerThunkAction,
  ProtectedSiteReducerThunkAction,
} from './types';
import { siteData, stewardshipActivities, adoptedSites } from './actions';
import protectedApiClient from '../../../api/protectedApiClient';

export const getSiteData = (siteId: number): SiteReducerThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(siteData.loading());
    dispatch(stewardshipActivities.loading());

    return Promise.all([
      apiClient.getSite(siteId),
      apiClient.getStewardshipActivities(siteId),
    ])
      .then((response: [SiteProps, StewardshipActivities]) => {
        dispatch(siteData.loaded(response[0]));
        dispatch(stewardshipActivities.loaded(response[1]));
      })
      .catch((error: any) => {
        dispatch(siteData.failed(error));
        dispatch(stewardshipActivities.failed(error));
      });
  };
};

export const getAdoptedSites = (): ProtectedSiteReducerThunkAction<void> => {
  return (dispatch, getState) => {
    dispatch(adoptedSites.loading());
    return protectedApiClient
      .getAdoptedSites()
      .then((reponse: AdoptedSites) => {
        dispatch(adoptedSites.loaded(reponse));
      })
      .catch((error: any) => {
        dispatch(adoptedSites.failed(error));
      });
  };
};
