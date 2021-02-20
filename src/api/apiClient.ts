import AppAxiosInstance from '../auth/axios';
import { VolunteerLeaderboardItem } from '../containers/volunteerLeaderboard/ducks/types';
import { TeamLeaderboardItem } from '../containers/teamLeaderboard/ducks/types';

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
}

enum ApiClientRoutes {
  USERS_LEADERBOARD = '/api/v1/leaderboard/users',
  TEAMS_LEADERBOARD = '/api/v1/leaderboard/teams',
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

const Client: ApiClient = Object.freeze({
  getUsersLeaderboard,
  getTeamsLeaderboard,
});

export default Client;
