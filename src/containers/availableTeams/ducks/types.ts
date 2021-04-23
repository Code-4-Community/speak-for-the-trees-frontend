import { AsyncRequest } from '../../../utils/asyncRequest';
import { C4CState } from '../../../store';
import { ThunkAction } from 'redux-thunk';
import { AvailableTeamsAction } from './actions';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { TeamResponse } from '../../teamPage/ducks/types';

export interface AvailableTeam extends TeamResponse {}

// Redux Types

export interface AvailableTeamsReducerState {
  readonly availableTeams: AsyncRequest<AvailableTeam[], any>;
}

export type AvailableTeamsThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  AvailableTeamsAction
>;
