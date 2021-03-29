import { genericAsyncActions } from '../../../utils/asyncRequest';
import { TeamResponse } from './types';

export const teamResponse = genericAsyncActions<TeamResponse, any>();

export type TeamResponseAction =
  | ReturnType<typeof teamResponse.loading>
  | ReturnType<typeof teamResponse.loaded>
  | ReturnType<typeof teamResponse.failed>;
