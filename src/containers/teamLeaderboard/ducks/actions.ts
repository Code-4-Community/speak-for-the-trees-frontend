import { genericAsyncActions } from '../../../utils/asyncRequest';
import { TeamLeaderboardItem } from './types';

export const teamLeaderboardItems = genericAsyncActions<
  TeamLeaderboardItem[],
  any
>();

export type TeamLeaderboardItemAction =
  | ReturnType<typeof teamLeaderboardItems.loading>
  | ReturnType<typeof teamLeaderboardItems.loaded>
  | ReturnType<typeof teamLeaderboardItems.failed>;
