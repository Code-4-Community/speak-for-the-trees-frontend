import { genericAsyncActions } from '../../../utils/asyncRequest';
import { AvailableTeam } from './types';

export const availableTeams = genericAsyncActions<AvailableTeam[], any>();

export type AvailableTeamsAction =
  | ReturnType<typeof availableTeams.loading>
  | ReturnType<typeof availableTeams.loaded>
  | ReturnType<typeof availableTeams.failed>;
