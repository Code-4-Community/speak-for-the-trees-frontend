import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { VolunteerLeaderboardItemAction } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';

export interface VolunteerLeaderboardItem {
  id: number;
  name: string;
  blocksCounted: number;
}

export interface UserLeaderboardReducerState {
  readonly userLeaderboard: AsyncRequest<VolunteerLeaderboardItem[], any>;
}

export type VolunteerLeaderboardThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  VolunteerLeaderboardItemAction
>;
