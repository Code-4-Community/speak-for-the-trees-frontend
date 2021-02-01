import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { LeaderboardItemActions } from './actions';
import { ApiExtraArgs } from '../../../api/apiClient';

export interface LeaderboardItem {
  id: number;
  name: string;
  blocksCounted: number;
}

export enum LeaderboardPreviousDays {
  weekly = 7,
  monthly = 30,
  yearly = 365,
  allTime = 9999,
}

export type LeaderboardThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ApiExtraArgs,
  LeaderboardItemActions
>;