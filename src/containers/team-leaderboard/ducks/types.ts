import { AsyncRequest } from '../../../utils/asyncRequest';
import { LeaderboardItem } from '../../../components/leaderboard/ducks/types';

export interface TeamLeaderboardReducerState {
  readonly teamLeaderboard: AsyncRequest<LeaderboardItem[], any>;
}
