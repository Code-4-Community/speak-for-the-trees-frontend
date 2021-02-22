import {
  BlockGeoData,
  NeighborhoodGeoData,
} from '../../components/mapPageComponents/mapContainer/ducks/types';
import ApiClient, { ApiClientRoutes } from '../apiClient';
import nock from 'nock';

const BASE_URL = 'http://localhost';

describe('Authentication Client Tests', () => {
  describe('Neighborhoods', () => {
    it('makes the right request', async () => {
      const response: NeighborhoodGeoData = {
        type: 'FeatureCollection',
        name: 'neighborhoods',
        features: [
          {
            type: 'Feature',
            properties: {
              neighborhood_id: 15,
              name: 'Roslindale',
              completion_perc: 0,
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

      nock(BASE_URL)
        .get(ApiClientRoutes.GET_ALL_NEIGHBORHOODS)
        .reply(200, response);

      const result = await ApiClient.getNeighborhoodGeoData();

      expect(result).toEqual(response);
    });
  });

  describe('Blocks', () => {
    it('makes the right request', async () => {
      const response: BlockGeoData = {
        type: 'FeatureCollection',
        name: 'blocks',
        features: [
          {
            type: 'Feature',
            properties: {
              block_id: 1714,
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

      nock(BASE_URL).get(ApiClientRoutes.GET_ALL_BLOCKS).reply(200, response);

      const result = await ApiClient.getBlockGeoData();

      expect(result).toEqual(response);
    });
  });
});
