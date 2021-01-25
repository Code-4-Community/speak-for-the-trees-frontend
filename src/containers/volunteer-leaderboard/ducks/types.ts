import { AsyncRequest } from '../../../utils/asyncRequest';
import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';

export interface UserLeaderboardWeeklyReducerState {
  readonly userLeaderboardWeekly: AsyncRequest<LeaderboardItem[], any>;
}

export interface UserLeaderboardMonthlyReducerState {
  readonly userLeaderboardMonthly: AsyncRequest<LeaderboardItem[], any>;
}

export interface UserLeaderboardYearlyReducerState {
  readonly userLeaderboardYearly: AsyncRequest<LeaderboardItem[], any>;
}

export interface UserLeaderboardAllTimeReducerState {
  readonly userLeaderboardAllTime: AsyncRequest<LeaderboardItem[], any>;
}
