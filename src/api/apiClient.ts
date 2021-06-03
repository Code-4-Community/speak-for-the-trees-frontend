import AppAxiosInstance from '../auth/axios';
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
} from '../components/mapPageComponents/ducks/types';

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
}

export enum ApiClientRoutes {
  USERS_LEADERBOARD = '/api/v1/leaderboard/users',
  TEAMS_LEADERBOARD = '/api/v1/leaderboard/teams',
  GET_ALL_BLOCKS = '/api/v1/map/blocks',
  GET_ALL_NEIGHBORHOODS = '/api/v1/map/neighborhoods',
  GET_ALL_SITES = '/api/v1/map/sites',
}

const baseSiteRoute = '/api/v1/sites/';

export const ParameterizedApiRoutes = {
  GET_SITE: (siteId: number): string => `${baseSiteRoute}${siteId}`,
  GET_STEWARSHIP_ACTIVITIES: (siteId: number): string =>
    `${baseSiteRoute}${siteId}/stewardship_activities`,
};

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
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_BLOCKS)
    .then((r) => r.data);
};

const getNeighborhoodGeoData = (): Promise<NeighborhoodGeoData> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_NEIGHBORHOODS)
    .then((r) => r.data);
};

const getSiteGeoData = (): Promise<SiteGeoData> => {
  return AppAxiosInstance.get(ApiClientRoutes.GET_ALL_SITES)
    .then((res) => res.data);
};

const getSite = (siteId: number): Promise<SiteProps> => {
  return AppAxiosInstance.get(ParameterizedApiRoutes.GET_SITE(siteId))
    .then((r) => r.data)
    .catch((e) => e);
};

const getStewardshipActivities = (
  siteId: number,
): Promise<StewardshipActivities> => {
  return AppAxiosInstance.get(
    ParameterizedApiRoutes.GET_STEWARSHIP_ACTIVITIES(siteId),
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const Client: ApiClient = Object.freeze({
  getUsersLeaderboard,
  getTeamsLeaderboard,
  getBlockGeoData,
  getNeighborhoodGeoData,
  getSiteGeoData,
  getSite,
  getStewardshipActivities,
});

export default Client;
