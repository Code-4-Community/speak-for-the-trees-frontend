import { AsyncRequest } from '../../../utils/asyncRequest';
import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';

export interface UserLeaderboardReducerState {
  readonly userLeaderboard: AsyncRequest<LeaderboardItem[], any>;
}
