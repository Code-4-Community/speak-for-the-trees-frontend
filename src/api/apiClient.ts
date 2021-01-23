import AppAxiosInstance from '../auth/axios';
import { LeaderboardItem } from '../components/leaderboard/ducks/types';

export interface ApiExtraArgs {
  readonly apiClient: ApiClient
}

export interface ApiClient {
  readonly getUsersLeaderboard: (previousDays: number) => Promise<LeaderboardItem[]>,
  readonly getTeamsLeaderboard: (previousDays: number) => Promise<LeaderboardItem[]>,
}

enum ApiClientRoutes {
  USERS_LEADERBOARD = '/api/v1/leaderboard/users',
  TEAMS_LEADERBOARD = '/api/v1/leaderboard/teams',
}

const getUsersLeaderboard = (previousDays: number): Promise<LeaderboardItem[]> => {
  return AppAxiosInstance.get(`${ApiClientRoutes.USERS_LEADERBOARD}/${previousDays}`).then(
    (response) => response.data.users,
  );
};

const getTeamsLeaderboard = (previousDays: number): Promise<LeaderboardItem[]> => {
  return AppAxiosInstance.get(`${ApiClientRoutes.TEAMS_LEADERBOARD}/${previousDays}`).then(
    (response) => response.data.teams,
  );
};

const Client: ApiClient = Object.freeze({
  getUsersLeaderboard,
  getTeamsLeaderboard
});

export default Client;