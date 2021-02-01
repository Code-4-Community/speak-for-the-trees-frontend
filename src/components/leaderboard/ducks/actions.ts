import { genericAsyncActions } from '../../../utils/asyncRequest';
import {
  LeaderboardItem,
  LeaderboardPreviousDays,
} from '../../../components/leaderboard/ducks/types';

export const leaderboardItemsWeekly = genericAsyncActions<
  LeaderboardItem[],
  any
>();

export const leaderboardItemsMonthly = genericAsyncActions<
  LeaderboardItem[],
  any
>();

export const leaderboardItemsYearly = genericAsyncActions<
  LeaderboardItem[],
  any
>();

export const leaderboardItemsAllTime = genericAsyncActions<
  LeaderboardItem[],
  any
>();

export type LeaderboardItemActions =
  | ReturnType<typeof leaderboardItemsWeekly.loading>
  | ReturnType<typeof leaderboardItemsWeekly.loaded>
  | ReturnType<typeof leaderboardItemsWeekly.failed>
  | ReturnType<typeof leaderboardItemsMonthly.loading>
  | ReturnType<typeof leaderboardItemsMonthly.loaded>
  | ReturnType<typeof leaderboardItemsMonthly.failed>
  | ReturnType<typeof leaderboardItemsYearly.loading>
  | ReturnType<typeof leaderboardItemsYearly.loaded>
  | ReturnType<typeof leaderboardItemsYearly.failed>
  | ReturnType<typeof leaderboardItemsAllTime.loading>
  | ReturnType<typeof leaderboardItemsAllTime.loaded>
  | ReturnType<typeof leaderboardItemsAllTime.failed>;

export const getLeaderboardAction = (previousDays: LeaderboardPreviousDays) => {
  switch (previousDays) {
    case 7:
      return leaderboardItemsWeekly;
    case 30:
      return leaderboardItemsMonthly;
    case 365:
      return leaderboardItemsYearly;
    default:
      return leaderboardItemsAllTime;
  }
};
