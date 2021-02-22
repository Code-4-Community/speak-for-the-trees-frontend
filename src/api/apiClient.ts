import AppAxiosInstance from '../auth/axios';
import { VolunteerLeaderboardItem } from '../containers/volunteerLeaderboard/ducks/types';
import { TeamLeaderboardItem } from '../containers/teamLeaderboard/ducks/types';
import {
  BlockGeoData,
  NeighborhoodGeoData,
} from '../components/mapPageComponents/mapContainer/ducks/types';

export interface ApiExtraArgs {
  readonly apiClient: ApiClient;
}

export interface ApiClient {
  readonly getUsersLeaderboard: (
    previousDays: number | null,
  ) => Promise<VolunteerLeaderboardItem[]>;
  readonly getTeamsLeaderboard: (
    previousDays: number | null,
  ) => Promise<TeamLeaderboardItem[]>;
  readonly getBlockGeoData: () => Promise<BlockGeoData>;
  readonly getNeighborhoodGeoData: () => Promise<NeighborhoodGeoData>;
}

enum ApiClientRoutes {
  USERS_LEADERBOARD = '/api/v1/leaderboard/users',
  TEAMS_LEADERBOARD = '/api/v1/leaderboard/teams',
  GET_ALL_BLOCKS = 'api/v1/map/blocks',
  GET_ALL_NEIGHBORHOODS = 'api/v1/map/neighborhoods',
}

const getUsersLeaderboard = (
  previousDays: number | null,
): Promise<VolunteerLeaderboardItem[]> => {
  return AppAxiosInstance.get(ApiClientRoutes.USERS_LEADERBOARD, {
    params: previousDays ? { previousDays } : {},
  }).then((response) => response.data.entries);
};

const getTeamsLeaderboard = (
  previousDays: number | null,
): Promise<TeamLeaderboardItem[]> => {
  return AppAxiosInstance.get(ApiClientRoutes.TEAMS_LEADERBOARD, {
    params: previousDays ? { previousDays } : {},
  }).then((response) => response.data.entries);
};

const getBlockGeoData = (): Promise<BlockGeoData> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_BLOCKS).then(
    (response) => {
      return response.data;
    },
  );
};

const getNeighborhoodGeoData = (): Promise<NeighborhoodGeoData> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_NEIGHBORHOODS).then(
    (response) => {
      return response.data;
    },
  );
};

const Client: ApiClient = Object.freeze({
  getUsersLeaderboard,
  getTeamsLeaderboard,
  getBlockGeoData,
  getNeighborhoodGeoData,
});

export default Client;
