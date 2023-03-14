import {
  AsyncRequest,
  AsyncRequestCompleted,
  AsyncRequestNotStarted,
  AsyncRequestFailed,
} from '../../../utils/asyncRequest';
import { AdoptedSites } from '../../treePage/ducks/types';
import { SiteGeoData } from '../../../components/mapComponents/ducks/types';
import { getMySites } from '../ducks/selectors';
describe('My Trees Selectors', () => {
  describe('getMySites', () => {
    const dummySites: SiteGeoData = {
      type: 'dumb',
      name: 'fake sites',
      features: [
        {
          type: 'dumb 0',
          properties: {
            id: 0,
            treePresent: true,
            lat: 100,
            lng: 50,
          },
          geometry: {
            type: 'fake 0',
            coordinates: [0, 0],
          },
        },
        {
          type: 'dumb 1',
          properties: {
            id: 1,
            treePresent: true,
            lat: 50,
            lng: 50,
          },
          geometry: {
            type: 'fake 1',
            coordinates: [1, 1],
          },
        },
        {
          type: 'dumb 2',
          properties: {
            id: 2,
            treePresent: false,
            lat: 100,
            lng: 100,
          },
          geometry: {
            type: 'fake 2',
            coordinates: [2, 2],
          },
        },
      ],
    };

    it('returns only sites that are adopted by the user', () => {
      const mySites: AdoptedSites = {
        adoptedSites: [1, 2],
      };

      const siteFeatureRequest: AsyncRequest<SiteGeoData, any> =
        AsyncRequestCompleted<SiteGeoData, any>(dummySites);

      const myAdoptedSiteRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestCompleted<AdoptedSites, any>(mySites);

      expect(
        getMySites(myAdoptedSiteRequest, siteFeatureRequest),
      ).toStrictEqual([
        {
          id: 1,
          treePresent: true,
          lat: 50,
          lng: 50,
        },
        {
          id: 2,
          treePresent: false,
          lat: 100,
          lng: 100,
        },
      ]);
    });

    it('Doesnt return site not in array', () => {
      const mySites: AdoptedSites = {
        adoptedSites: [1, 3],
      };

      const siteFeatureRequest: AsyncRequest<SiteGeoData, any> =
        AsyncRequestCompleted<SiteGeoData, any>(dummySites);

      const myAdoptedSiteRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestCompleted<AdoptedSites, any>(mySites);

      expect(
        getMySites(myAdoptedSiteRequest, siteFeatureRequest),
      ).toStrictEqual([
        {
          id: 1,
          treePresent: true,
          lat: 50,
          lng: 50,
        },
      ]);
    });

    it('returns empty array when adopted site request is not complete', () => {
      const siteFeatureRequest: AsyncRequest<SiteGeoData, any> =
        AsyncRequestCompleted<SiteGeoData, any>(dummySites);

      const myAdoptedSiteRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestNotStarted<AdoptedSites, any>();

      expect(
        getMySites(myAdoptedSiteRequest, siteFeatureRequest),
      ).toStrictEqual([]);
    });

    it('returns empty array when request failed', () => {
      const mySites: AdoptedSites = {
        adoptedSites: [1, 2],
      };

      const siteFeatureRequest: AsyncRequest<SiteGeoData, any> =
        AsyncRequestFailed<SiteGeoData, any>(dummySites);

      const myAdoptedSiteRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestCompleted<AdoptedSites, any>(mySites);

      expect(
        getMySites(myAdoptedSiteRequest, siteFeatureRequest),
      ).toStrictEqual([]);
    });

    it('returns nothing when no sites are adopted', () => {
      const mySites: AdoptedSites = {
        adoptedSites: [],
      };

      const siteFeatureRequest: AsyncRequest<SiteGeoData, any> =
        AsyncRequestCompleted<SiteGeoData, any>(dummySites);

      const myAdoptedSiteRequest: AsyncRequest<AdoptedSites, any> =
        AsyncRequestCompleted<AdoptedSites, any>(mySites);

      expect(
        getMySites(myAdoptedSiteRequest, siteFeatureRequest),
      ).toStrictEqual([]);
    });
  });
});
