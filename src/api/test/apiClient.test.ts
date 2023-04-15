import {
  BlockGeoData,
  NeighborhoodGeoData,
  SiteGeoData,
} from '../../components/mapComponents/ducks/types';
import ApiClient, {
  ApiClientRoutes,
  ParameterizedApiRoutes,
} from '../apiClient';
import nock from 'nock';
import { VolunteerLeaderboardItem } from '../../containers/volunteerLeaderboard/ducks/types';
import { TeamLeaderboardItem } from '../../containers/teamLeaderboard/ducks/types';

const BASE_URL = 'http://localhost';

describe('Api Client Tests', () => {
  describe('Get users leaderboard', () => {
    it('makes the right request', async () => {
      const response: VolunteerLeaderboardItem[] = [
        {
          id: 1,
          name: 'John',
          blocksCounted: 5,
        },
        {
          id: 2,
          name: 'John2',
          blocksCounted: 4,
        },
      ];

      nock(BASE_URL)
        .get(ParameterizedApiRoutes.GET_USERS_LEADERBOARD(5))
        .reply(200, response);
      const result = await ApiClient.getUsersLeaderboard(5);
      expect(result).toEqual(response);
    });

    it('makes the right request on null', async () => {
      const response: VolunteerLeaderboardItem[] = [];

      nock(BASE_URL)
        .get(ApiClientRoutes.USERS_LEADERBOARD)
        .reply(200, response);
      const result = await ApiClient.getUsersLeaderboard(null);
      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Bad request';

      nock(BASE_URL)
        .get(ApiClientRoutes.USERS_LEADERBOARD)
        .reply(400, response);
      const result = await ApiClient.getUsersLeaderboard(null).catch(
        (err) => err.response.data,
      );
      expect(result).toEqual(response);
    });
  });

  describe('Get teams leaderboard', () => {
    it('makes the right request', async () => {
      const response: TeamLeaderboardItem[] = [
        {
          id: 1,
          name: 'Great Team',
          blocksCounted: 5,
        },
        {
          id: 2,
          name: 'Team 1',
          blocksCounted: 4,
        },
      ];

      nock(BASE_URL)
        .get(ParameterizedApiRoutes.GET_TEAMS_LEADERBOARD(5))
        .reply(200, response);
      const result = await ApiClient.getTeamsLeaderboard(5);
      expect(result).toEqual(response);
    });

    it('makes the right request on null', async () => {
      const response: TeamLeaderboardItem[] = [];

      nock(BASE_URL)
        .get(ApiClientRoutes.TEAMS_LEADERBOARD)
        .reply(200, response);
      const result = await ApiClient.getTeamsLeaderboard(null);
      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'Bad request';

      nock(BASE_URL)
        .get(ApiClientRoutes.TEAMS_LEADERBOARD)
        .reply(400, response);
      const result = await ApiClient.getTeamsLeaderboard(null).catch(
        (err) => err.response.data,
      );
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

      nock(BASE_URL).get(ApiClientRoutes.GET_ALL_BLOCKS).reply(200, response);

      const result = await ApiClient.getBlockGeoData();

      expect(result).toEqual(response);
    });

    describe('Neighborhoods', () => {
      it('makes the right request', async () => {
        const response: NeighborhoodGeoData = {
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

        nock(BASE_URL)
          .get(ApiClientRoutes.GET_ALL_NEIGHBORHOODS)
          .reply(200, response);

        const result = await ApiClient.getNeighborhoodGeoData();

        expect(result).toEqual(response);
      });
    });

    describe('Sites', () => {
      it('makes the right request', async () => {
        const response: SiteGeoData = {
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
                coordinates: [-71.0293810011, 42.3488784985],
              },
            },
          ],
        };

        nock(BASE_URL).get(ApiClientRoutes.GET_ALL_SITES).reply(200, response);

        const result = await ApiClient.getSiteGeoData();

        expect(result).toEqual(response);
      });
    });
  });

  describe('Get a site', () => {
    it('makes the right request', async () => {
      const response = {
        siteId: 1000,
        blockId: 10,
        lat: 1,
        lng: 1,
        city: 'Boston',
        zip: '02115',
        address: '1000 boston ave',
        entries: [
          {
            id: 1,
            username: 'will',
            updatedAt: 10000000,
            treePresent: true,
            genus: 'bad',
          },
          {
            id: 1,
            username: 'will',
            updatedAt: 1000000,
            treePresent: false,
          },
        ],
      };

      nock(BASE_URL)
        .get(ParameterizedApiRoutes.GET_SITE(1000))
        .reply(200, response);

      const result = await ApiClient.getSite(1000);

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'No such site';

      nock(BASE_URL)
        .get(ParameterizedApiRoutes.GET_SITE(20))
        .reply(400, response);

      const result = await ApiClient.getSite(20).catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });
  });

  describe('Get stewardship activities', () => {
    it('makes the right request', async () => {
      const response = {
        activities: [
          {
            id: 3,
            userId: 'will',
            date: 100000,
            watered: true,
            mulched: false,
            cleaned: false,
            weeded: true,
          },
          {
            id: 2,
            userId: 'will',
            date: 10000,
            watered: false,
            mulched: false,
            cleaned: true,
            weeded: true,
          },
        ],
      };

      nock(BASE_URL)
        .get(ParameterizedApiRoutes.GET_STEWARDSHIP_ACTIVITIES(1000))
        .reply(200, response);

      const result = await ApiClient.getStewardshipActivities(1000);

      expect(result).toEqual(response);
    });

    it('makes a bad request', async () => {
      const response = 'No such site';

      nock(BASE_URL)
        .get(ParameterizedApiRoutes.GET_STEWARDSHIP_ACTIVITIES(20))
        .reply(400, response);

      const result = await ApiClient.getStewardshipActivities(20).catch(
        (err) => err.response.data,
      );

      expect(result).toEqual(response);
    });
  });

  describe('Get all common names', () => {
    it('makes the right response', async () => {
      const response = { names: ['tree1', 'tree2'] };

      nock(BASE_URL)
        .get(ParameterizedApiRoutes.GET_ALL_COMMON_NAMES)
        .reply(200, response);

      const result = await ApiClient.getAllCommonNames();

      expect(result).toEqual(response.names);
    });
  });
});
