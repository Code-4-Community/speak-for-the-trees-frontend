import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { LeaderboardItemActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';

export interface LeaderboardItemsReducerState {
  readonly volunteerLeaderboard: AsyncRequest<LeaderboardItem[], any>;
  readonly teamLeaderboard: AsyncRequest<LeaderboardItem[], any>;
}

export interface LeaderboardItem {
  id: number;
  name: string;
  blocksCounted: number;
}

export type LeaderboardThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  LeaderboardItemActions
>;
