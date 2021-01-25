import { genericAsyncActions } from '../../../utils/asyncRequest';
import { LeaderboardItem } from './types';

export const leaderboardItems = genericAsyncActions<LeaderboardItem[], any>();

export type LeaderboardItemActions = 
  | ReturnType<typeof leaderboardItems.loading>
  | ReturnType<typeof leaderboardItems.loaded>
  | ReturnType<typeof leaderboardItems.failed>;
