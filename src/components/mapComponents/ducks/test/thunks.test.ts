import { BlockGeoData, NeighborhoodGeoData, SiteGeoData } from '../types';
import { getMapGeoData } from '../thunks';
import { neighborhoodGeoData, siteGeoData } from '../actions';
import { C4CState, initialStoreState, ThunkExtraArgs } from '../../../../store';
import authClient from '../../../../auth/authClient';
import apiClient from '../../../../api/apiClient';
import protectedApiClient from '../../../../api/protectedApiClient';

export const generateState = (partialState: Partial<C4CState>): C4CState => ({
  ...initialStoreState,
  ...partialState,
});

describe('Map Thunks', () => {
  describe('getMapGeoData', () => {
    it('dispatches blockGeoData.loaded(), neighborhoodGeoData.loaded(), and siteGeoData.loaded actions after getting map data', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetBlockGeoData = jest.fn();
      const mockGetNeighborhoodGeoData = jest.fn();
      const mockGetSiteGeoData = jest.fn();
      const mockBlockDataResponse: BlockGeoData = {
        type: 'FeatureCollection',
        name: 'blocks',
        features: [
          {
            type: 'Feature',
            properties: {
              blockId: 1714,
              lat: 42.3488784985,
              lng: -71.0293810011,
            },
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [
                    [-71.02859399925286, 42.34889700150278],
                    [-71.02912299801895, 42.34837799993562],
                  ],
                ],
              ],
            },
          },
        ],
      };
      const mockNeighborhoodDataResponse: NeighborhoodGeoData = {
        type: 'FeatureCollection',
        name: 'neighborhoods',
        features: [
          {
            type: 'Feature',
            properties: {
              neighborhoodId: 15,
              name: 'Roslindale',
              completionPerc: 0,
              lat: 42.2803,
              lng: -71.1266,
            },
            geometry: {
              type: 'MultiPolygon',
              coordinates: [
                [
                  [
                    [-71.12592717485386, 42.272013107957406],
                    [-71.12610933458738, 42.2716219294518],
                  ],
                ],
              ],
            },
          },
        ],
      };
      const mockSiteDataResponse: SiteGeoData = {
        type: 'FeatureCollection',
        name: 'sites',
        features: [
          {
            type: 'Feature',
            properties: {
              id: 213,
              treePresent: true,
              commonName: 'Willow',
              adopterId: 'username',
              address: '123 Street',
              lat: 42.3488784985,
              lng: -71.0293810011,
            },
            geometry: {
              type: 'Point',
              coordinates: [[[[-71.02859399925286, 42.34889700150278]]]],
            },
          },
        ],
      };

      mockGetBlockGeoData.mockResolvedValue(mockBlockDataResponse);
      mockGetNeighborhoodGeoData.mockResolvedValue(
        mockNeighborhoodDataResponse,
      );
      mockGetSiteGeoData.mockResolvedValue(mockSiteDataResponse);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient,
        protectedApiClient,
        apiClient: {
          ...apiClient,
          getBlockGeoData: mockGetBlockGeoData,
          getNeighborhoodGeoData: mockGetNeighborhoodGeoData,
          getSiteGeoData: mockGetSiteGeoData,
        },
      };

      await getMapGeoData()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      // TODO: remove these tests when doing final code cleanups
      // expect(mockDispatch).toHaveBeenNthCalledWith(
      //   4,
      //   blockGeoData.loaded(mockBlockDataResponse),
      // );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        neighborhoodGeoData.loaded(mockNeighborhoodDataResponse),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        siteGeoData.loaded(mockSiteDataResponse),
      );
      // expect(mockGetBlockGeoData).toBeCalledTimes(1);
      expect(mockGetNeighborhoodGeoData).toBeCalledTimes(1);
      expect(mockGetSiteGeoData).toBeCalledTimes(1);
    });

    it('dispatches blockGeoData.failed(), neighborhoodGeoData.failed(), and siteGeoData.failed() actions when API fails', async () => {
      const getState = () => generateState({});
      const mockDispatch = jest.fn();
      const mockGetBlockGeoData = jest.fn();
      const mockGetNeighborhoodGeoData = jest.fn();
      const mockGetSiteGeoData = jest.fn();
      const mockAPIError = {
        response: {
          data: 'Failed',
        },
      };
      mockGetBlockGeoData.mockRejectedValue(mockAPIError);
      mockGetNeighborhoodGeoData.mockRejectedValue(mockAPIError);
      mockGetSiteGeoData.mockRejectedValue(mockAPIError);
      const mockExtraArgs: ThunkExtraArgs = {
        authClient,
        protectedApiClient,
        apiClient: {
          ...apiClient,
          getBlockGeoData: mockGetBlockGeoData,
          getNeighborhoodGeoData: mockGetNeighborhoodGeoData,
          getSiteGeoData: mockGetSiteGeoData,
        },
      };

      await getMapGeoData()(mockDispatch, getState, mockExtraArgs);

      expect(mockDispatch).toHaveBeenCalledTimes(4);
      // expect(mockDispatch).toHaveBeenNthCalledWith(
      //   4,
      //   blockGeoData.failed(mockAPIError),
      // );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        3,
        neighborhoodGeoData.failed(mockAPIError),
      );
      expect(mockDispatch).toHaveBeenNthCalledWith(
        4,
        siteGeoData.failed(mockAPIError),
      );
      // expect(mockGetBlockGeoData).toBeCalledTimes(1);
      expect(mockGetNeighborhoodGeoData).toBeCalledTimes(1);
      expect(mockGetSiteGeoData).toBeCalledTimes(1);
    });
  });
});
