import { blockGeoData, neighborhoodGeoData, siteGeoData } from '../actions';
import reducers, { initialMapGeoDataState } from '../reducer';
import {
  BlockGeoData,
  NeighborhoodGeoData,
  SiteGeoData,
  MapGeoDataReducerState,
} from '../types';
import { AsyncRequestCompleted } from '../../../../utils/asyncRequest';

describe('Map Reducers', () => {
  describe('BlockGeoData', () => {
    it('Updates state correctly when block data is retrieved', () => {
      const blockData: BlockGeoData = {
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
      const action = blockGeoData.loaded(blockData);
      const expectedNextState: MapGeoDataReducerState = {
        ...initialMapGeoDataState,
        blockGeoData: AsyncRequestCompleted<BlockGeoData, void>(blockData),
      };
      expect(reducers(initialMapGeoDataState, action)).toEqual(
        expectedNextState,
      );
    });
  });

  describe('NeighborhoodGeoData', () => {
    it('Updates state correctly when neighborhood data is retrieved', () => {
      const neighborhoodData: NeighborhoodGeoData = {
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
      const action = neighborhoodGeoData.loaded(neighborhoodData);
      const expectedNextState: MapGeoDataReducerState = {
        ...initialMapGeoDataState,
        neighborhoodGeoData: AsyncRequestCompleted<NeighborhoodGeoData, void>(
          neighborhoodData,
        ),
      };
      expect(reducers(initialMapGeoDataState, action)).toEqual(
        expectedNextState,
      );
    });
  });

  describe('SiteGeoData', () => {
    it('Updates state correctly when site data is retrieved', () => {
      const siteData: SiteGeoData = {
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
      const action = siteGeoData.loaded(siteData);
      const expectedNextState: MapGeoDataReducerState = {
        ...initialMapGeoDataState,
        siteGeoData: AsyncRequestCompleted<SiteGeoData, void>(siteData),
      };
      expect(reducers(initialMapGeoDataState, action)).toEqual(
        expectedNextState,
      );
    });
  });
});
