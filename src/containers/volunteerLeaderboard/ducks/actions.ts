import { genericAsyncActions } from '../../../utils/asyncRequest';
import { VolunteerLeaderboardItem } from './types';

export const volunteerLeaderboardItems = genericAsyncActions<
  VolunteerLeaderboardItem[],
  any
>();

export type VolunteerLeaderboardItemAction =
  | ReturnType<typeof volunteerLeaderboardItems.loading>
  | ReturnType<typeof volunteerLeaderboardItems.loaded>
  | ReturnType<typeof volunteerLeaderboardItems.failed>;
