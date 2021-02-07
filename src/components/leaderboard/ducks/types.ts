import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { LeaderboardItemAction } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';

export interface LeaderboardItem {
  id: number;
  name: string;
  blocksCounted: number;
}

export type LeaderboardThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  LeaderboardItemAction
>;
