import axios, { AxiosInstance } from 'axios';

import { VolunteerLeaderboardItem } from '../containers/volunteerLeaderboard/ducks/types';
import { TeamLeaderboardItem } from '../containers/teamLeaderboard/ducks/types';
import {
  StewardshipActivities,
  SiteProps,
} from '../containers/treePage/ducks/types';
import {
  BlockGeoData,
  NeighborhoodGeoData,
  SiteGeoData,
} from '../components/mapComponents/ducks/types';

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
  readonly getSiteGeoData: () => Promise<SiteGeoData>;
  readonly getSite: (siteId: number) => Promise<SiteProps>;
  readonly getStewardshipActivities: (
    siteId: number,
  ) => Promise<StewardshipActivities>;
  readonly getAllCommonNames: () => Promise<{ names: string[] }>;
}

export enum ApiClientRoutes {
  USERS_LEADERBOARD = '/api/v1/leaderboard/users',
  TEAMS_LEADERBOARD = '/api/v1/leaderboard/teams',
  GET_ALL_BLOCKS = '/api/v1/map/blocks',
  GET_ALL_NEIGHBORHOODS = '/api/v1/map/neighborhoods',
  GET_ALL_SITES = '/api/v1/map/sites',
  GET_ALL_COMMON_NAMES = '/api/v1/sites/info/common_names',
}

const baseSiteRoute = '/api/v1/sites/';

export const ParameterizedApiRoutes = {
  GET_USERS_LEADERBOARD: (previousDays: number): string =>
    `${ApiClientRoutes.USERS_LEADERBOARD}?previousDays=${previousDays}`,
  GET_TEAMS_LEADERBOARD: (previousDays: number): string =>
    `${ApiClientRoutes.TEAMS_LEADERBOARD}?previousDays=${previousDays}`,
  GET_SITE: (siteId: number): string => `${baseSiteRoute}${siteId}`,
  GET_STEWARDSHIP_ACTIVITIES: (siteId: number): string =>
    `${baseSiteRoute}${siteId}/stewardship_activities`,
};

export const AppAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getUsersLeaderboard = (
  previousDays: number | null,
): Promise<VolunteerLeaderboardItem[]> => {
  return AppAxiosInstance.get(
    `${
      previousDays
        ? ParameterizedApiRoutes.GET_USERS_LEADERBOARD(previousDays)
        : ApiClientRoutes.USERS_LEADERBOARD
    }`,
  ).then((res) => res.data);
};

const getTeamsLeaderboard = (
  previousDays: number | null,
): Promise<TeamLeaderboardItem[]> => {
  return AppAxiosInstance.get(
    `${
      previousDays
        ? ParameterizedApiRoutes.GET_TEAMS_LEADERBOARD(previousDays)
        : ApiClientRoutes.TEAMS_LEADERBOARD
    }`,
  ).then((res) => res.data);
};

const getBlockGeoData = (): Promise<BlockGeoData> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_BLOCKS).then(
    (res) => res.data,
  );
};

const getNeighborhoodGeoData = (): Promise<NeighborhoodGeoData> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_NEIGHBORHOODS).then(
    (res) => res.data,
  );
};

const getSiteGeoData = (): Promise<SiteGeoData> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_SITES).then(
    (res) => res.data,
  );
};

const getSite = (siteId: number): Promise<SiteProps> => {
  return AppAxiosInstance.get(ParameterizedApiRoutes.GET_SITE(siteId)).then(
    (res) => res.data,
  );
};

const getStewardshipActivities = (
  siteId: number,
): Promise<StewardshipActivities> => {
  return AppAxiosInstance.get(
    ParameterizedApiRoutes.GET_STEWARDSHIP_ACTIVITIES(siteId),
  ).then((res) => res.data);
};

const getAllCommonNames = (): Promise<{ names: string[] }> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_COMMON_NAMES).then(
    (res) => res.data,
  );
};

const Client: ApiClient = Object.freeze({
  getUsersLeaderboard,
  getTeamsLeaderboard,
  getBlockGeoData,
  getNeighborhoodGeoData,
  getSiteGeoData,
  getSite,
  getStewardshipActivities,
  getAllCommonNames,
});

export default Client;
