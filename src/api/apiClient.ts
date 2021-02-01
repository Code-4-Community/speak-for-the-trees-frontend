import AppAxiosInstance from '../auth/axios';
import { LeaderboardItem } from '../components/leaderboard/ducks/types';

export interface ApiExtraArgs {
  readonly apiClient: ApiClient;
}

export interface ApiClient {
  readonly getUsersLeaderboard: (
    previousDays: number,
  ) => Promise<LeaderboardItem[]>;
  readonly getTeamsLeaderboard: (
    previousDays: number,
  ) => Promise<LeaderboardItem[]>;
}

enum ApiClientRoutes {
  USERS_LEADERBOARD = '/api/v1/leaderboard/users',
  TEAMS_LEADERBOARD = '/api/v1/leaderboard/teams',
}

const getUsersLeaderboard = (
  previousDays: number,
): Promise<LeaderboardItem[]> => {
  // return AppAxiosInstance.get(ApiClientRoutes.USERS_LEADERBOARD, {
  //   params: {
  //     previousDays,
  //   },
  // }).then((response) => response.data.users);
  switch (previousDays) {
    case 7:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 'u week',
            blocksCounted: 100,
          },
        ]);
      });
    case 30:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 'u month',
            blocksCounted: 100,
          },
        ]);
      });
    case 365:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 'u year',
            blocksCounted: 100,
          },
        ]);
      });
    case 9999:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 'u all time',
            blocksCounted: 100,
          },
        ]);
      });
    default:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([]);
      });
  }
};

const getTeamsLeaderboard = (
  previousDays: number,
): Promise<LeaderboardItem[]> => {
  /*
  return AppAxiosInstance.get(ApiClientRoutes.TEAMS_LEADERBOARD, {
    params: {
      previousDays,
    },
  }).then((response) => response.data.teams);
  */
  switch (previousDays) {
    case 7:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 't week',
            blocksCounted: 100,
          },
        ]);
      });
    case 30:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 't month',
            blocksCounted: 100,
          },
        ]);
      });
    case 365:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 't year',
            blocksCounted: 100,
          },
        ]);
      });
    case 9999:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([
          {
            id: 0,
            name: 't all time',
            blocksCounted: 100,
          },
        ]);
      });
    default:
      return new Promise<LeaderboardItem[]>((resolve) => {
        resolve([]);
      });
  }
};

const Client: ApiClient = Object.freeze({
  getUsersLeaderboard,
  getTeamsLeaderboard,
});

export default Client;
