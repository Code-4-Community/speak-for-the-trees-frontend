import { AvailableTeam, AvailableTeamsThunkAction } from './types';
import { availableTeams } from './actions';

export const getTeams = (): AvailableTeamsThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(availableTeams.loading());
    return protectedApiClient
      .getTeams()
      .then((response: AvailableTeam[]) => {
        dispatch(availableTeams.loaded(response));
      })
      .catch((error: any) => {
        dispatch(availableTeams.failed(error));
      });
  };
};
