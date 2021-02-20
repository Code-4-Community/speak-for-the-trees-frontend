import { TeamLeaderboardItem, TeamLeaderboardThunkAction } from './types';
import { teamLeaderboardItems } from './actions';

export const getTeamsLeaderboard = (
  previousDays: number | null,
): TeamLeaderboardThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(teamLeaderboardItems.loading());
    return apiClient
      .getTeamsLeaderboard(previousDays)
      .then((response: TeamLeaderboardItem[]) => {
        dispatch(teamLeaderboardItems.loaded(response));
      })
      .catch((error: any) => {
        dispatch(teamLeaderboardItems.failed(error));
      });
  };
};
