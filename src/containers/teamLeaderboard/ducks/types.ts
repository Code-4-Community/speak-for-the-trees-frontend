import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { TeamLeaderboardItemAction } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';

export interface TeamLeaderboardItem {
  id: number;
  name: string;
  blocksCounted: number;
}

export interface TeamLeaderboardReducerState {
  readonly teamLeaderboard: AsyncRequest<TeamLeaderboardItem[], any>;
}

export type TeamLeaderboardThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  TeamLeaderboardItemAction
>;
