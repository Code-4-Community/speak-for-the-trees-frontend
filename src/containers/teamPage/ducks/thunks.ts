import { TeamResponse, TeamThunkAction } from './types';
import { teamResponse } from './actions';

export const getTeam = (teamId: number): TeamThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
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
