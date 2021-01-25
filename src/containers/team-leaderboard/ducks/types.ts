import { AsyncRequest } from '../../../utils/asyncRequest';
import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';

export interface TeamLeaderboardWeeklyReducerState {
  readonly teamLeaderboardWeekly: AsyncRequest<LeaderboardItem[], any>;
}

export interface TeamLeaderboardMonthlyReducerState {
  readonly teamLeaderboardMonthly: AsyncRequest<LeaderboardItem[], any>;
}

export interface TeamLeaderboardYearlyReducerState {
  readonly teamLeaderboardYearly: AsyncRequest<LeaderboardItem[], any>;
}

export interface TeamLeaderboardAllTimeReducerState {
  readonly teamLeaderboardAllTime: AsyncRequest<LeaderboardItem[], any>;
}
