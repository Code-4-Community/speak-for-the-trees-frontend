import { TeamResponse, TeamThunkAction } from './types';
import { teamResponse } from './actions';
import protectedApiClient from '../../../api/protectedApiClient';

export const getTeam = (teamId: number): TeamThunkAction<void> => {
  return (dispatch, getState) => {
    dispatch(teamResponse.loading());
    return protectedApiClient
      .getTeam(teamId)
      .then((response: TeamResponse) => {
        dispatch(teamResponse.loaded(response));
      })
      .catch((error: any) => {
        dispatch(teamResponse.failed(error));
      });
  };
};
