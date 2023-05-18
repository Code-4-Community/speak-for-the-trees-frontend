import {
  AdoptedSites,
  StewardshipActivities,
  SiteProps,
  SiteEntryStatus,
} from '../ducks/types';
import { getSiteData, getAdoptedSites } from '../ducks/thunks';
import {
  siteData,
  stewardshipActivities,
  adoptedSites,
} from '../ducks/actions';
import { C4CState, initialStoreState, ThunkExtraArgs } from '../../../store';
import protectedApiClient, {
  ProtectedApiClientRoutes,
} from '../../../api/protectedApiClient';
import apiClient from '../../../api/apiClient';
import authClient from '../../../auth/authClient';
import nock from 'nock';

const BASE_URL = 'http://localhost';

export const generateState = (partialState: Partial<C4CState>): C4CState => ({
  ...initialStoreState,
  ...partialState,
});

describe('Tree Page Thunks', () => {
  describe('getSiteData', () => {
    it('dispatches siteData.loaded() and stewardshipActivities.loaded() on getting site data', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetSite = jest.fn();
      const mockGetStewardship = jest.fn();
      const mockActivities: StewardshipActivities = {
        stewardshipActivities: [
          {
            id: 0,
            userId: 1,
            date: '01/01/2021',
            watered: true,
            mulched: true,
            cleaned: false,
            weeded: true,
          },
          {
            id: 1,
            userId: 1,
            date: '02/23/2021',
            watered: false,
            mulched: false,
            cleaned: true,
            weeded: false,
          },
        ],
      };
      const mockSite: SiteProps = {
        neighborhoodId: 0,
        siteId: 0,
        blockId: 1,
        lat: 100,
        lng: 50,
        city: 'beantown',
        zip: '11111',
        address: '1800 place',
        owner: 'ROW',
        entries: [
          {
            id: 1,
            updatedAt: 200,
            status: SiteEntryStatus.ALIVE,
            species: 'tree',
            genus: 'big',
            circumference: 4,
            bicycle: true,
          },
          {
            id: 2,
            updatedAt: 100,
            status: SiteEntryStatus.DEAD_BUT_STANDING,
            species: 'not a tree',
            circumference: 2,
            bicycle: false,
          },
        ],
      };
      mockGetSite.mockResolvedValue(mockSite);
      mockGetStewardship.mockResolvedValue(mockActivities);
      const mockExtraArgs: ThunkExtraArgs = {
        apiClient: {
          ...apiClient,
          getSite: mockGetSite,
          getStewardshipActivities: mockGetStewardship,
        },
        protectedApiClient,
        authClient,
      };

      await getSiteData(0)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        siteData.loaded(mockSite),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        stewardshipActivities.loaded(mockActivities),
      );
      expect(mockGetSite).toBeCalledTimes(1);
      expect(mockGetStewardship).toBeCalledTimes(1);
    });

    it('dispatches siteData.failed() and and stewardshipActivities.failed() actions when siteData call fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetSite = jest.fn();
      const mockGetStewardship = jest.fn();
      const mockActivities: StewardshipActivities = {
        stewardshipActivities: [
          {
            id: 0,
            userId: 1,
            date: '01/01/2021',
            watered: true,
            mulched: true,
            cleaned: false,
            weeded: true,
          },
          {
            id: 1,
            userId: 1,
            date: '02/23/2021',
            watered: false,
            mulched: false,
            cleaned: true,
            weeded: false,
          },
        ],
      };
      const mockAPIError = {
        response: {
          data: 'unable to load site',
        },
      };
      mockGetSite.mockRejectedValue(mockAPIError);
      mockGetStewardship.mockResolvedValue(mockActivities);
      const mockExtraArgs: ThunkExtraArgs = {
        apiClient: {
          ...apiClient,
          getSite: mockGetSite,
          getStewardshipActivities: mockGetStewardship,
        },
        protectedApiClient,
        authClient,
      };

      await getSiteData(0)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        siteData.failed(mockAPIError),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        stewardshipActivities.failed(mockAPIError),
      );
      expect(mockGetSite).toBeCalledTimes(1);
      expect(mockGetStewardship).toBeCalledTimes(1);
    });

    it('dispatches siteData.failed() and and stewardshipActivities.failed() actions when stewardshipActivities call fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetSite = jest.fn();
      const mockGetStewardship = jest.fn();
      const mockSite: SiteProps = {
        neighborhoodId: 0,
        siteId: 0,
        blockId: 1,
        lat: 100,
        lng: 50,
        city: 'beantown',
        zip: '11111',
        address: '1800 place',
        owner: 'ROW',
        entries: [
          {
            id: 1,
            updatedAt: 200,
            status: SiteEntryStatus.ALIVE,
            species: 'tree',
            genus: 'big',
            circumference: 4,
            bicycle: true,
          },
          {
            id: 2,
            updatedAt: 100,
            status: SiteEntryStatus.DEAD,
            species: 'not a tree',
            circumference: 2,
            bicycle: false,
          },
        ],
      };
      const mockAPIError = {
        response: {
          data: 'unable to load site',
        },
      };
      mockGetSite.mockResolvedValue(mockSite);
      mockGetStewardship.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        apiClient: {
          ...apiClient,
          getSite: mockGetSite,
          getStewardshipActivities: mockGetStewardship,
        },
        protectedApiClient,
        authClient,
      };

      await getSiteData(0)(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        siteData.failed(mockAPIError),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        stewardshipActivities.failed(mockAPIError),
      );
      expect(mockGetSite).toBeCalledTimes(1);
      expect(mockGetStewardship).toBeCalledTimes(1);
    });
  });

  describe('getAdoptedSites', () => {
    it('dispatches adoptedSites.loaded() on getting adopted sites', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockAdoptedSites: AdoptedSites = {
        adoptedSites: [1, 2, 3],
      };
      const mockExtraArgs: ThunkExtraArgs = {
        apiClient,
        protectedApiClient,
        authClient,
      };

      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_ADOPTED_SITES)
        .reply(200, mockAdoptedSites);

      await getAdoptedSites()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        adoptedSites.loaded(mockAdoptedSites),
      );
    });

    it('dispatches adoptedSites.failed() when api call fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockAPIErrorData = 'unable to load site';
      const mockExtraArgs: ThunkExtraArgs = {
        apiClient,
        protectedApiClient,
        authClient,
      };

      nock(BASE_URL)
        .get(ProtectedApiClientRoutes.GET_ADOPTED_SITES)
        .reply(400, mockAPIErrorData);

      await getAdoptedSites()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenNthCalledWith(
        2,
        adoptedSites.failed(mockAPIErrorData),
      );
    });
  });
});
