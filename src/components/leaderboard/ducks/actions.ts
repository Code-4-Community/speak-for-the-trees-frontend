import { genericAsyncActions } from '../../../utils/asyncRequest';
import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';

export const leaderboardItems = genericAsyncActions<LeaderboardItem[], any>();

export type LeaderboardItemAction =
  | ReturnType<typeof leaderboardItems.loading>
  | ReturnType<typeof leaderboardItems.loaded>
  | ReturnType<typeof leaderboardItems.failed>;
