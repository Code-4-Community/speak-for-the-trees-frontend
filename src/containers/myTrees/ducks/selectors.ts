import {
  SiteGeoData,
  SiteFeaturePropertiesResponse,
} from '../../../components/mapComponents/ducks/types';
import {
  AsyncRequest,
  asyncRequestIsComplete,
} from '../../../utils/asyncRequest';
import { AdoptedSites } from '../../treePage/ducks/types';

export const getMySites = (
  adoptedIds: AsyncRequest<AdoptedSites, any>,
  siteGeoData: AsyncRequest<SiteGeoData, any>,
): SiteFeaturePropertiesResponse[] => {
  if (
    asyncRequestIsComplete(adoptedIds) &&
    asyncRequestIsComplete(siteGeoData)
  ) {
    return siteGeoData.result.features.reduce(
      (soFar: SiteFeaturePropertiesResponse[], feature) => {
        if (adoptedIds.result.adoptedSites.includes(feature.properties.id)) {
          soFar.push(feature.properties);
        }
        return soFar;
      },
      [],
    );
  } else {
    return [];
  }
};
