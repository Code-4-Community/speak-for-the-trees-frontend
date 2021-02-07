import {
  LeaderboardItem,
  LeaderboardThunkAction,
} from '../../../components/leaderboard/ducks/types';
import { leaderboardItems } from '../../../components/leaderboard/ducks/actions';

export const getTeamsLeaderboard = (
  previousDays: number,
): LeaderboardThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(leaderboardItems.loading());
    return apiClient
      .getTeamsLeaderboard(previousDays)
      .then((response: LeaderboardItem[]) => {
        dispatch(leaderboardItems.loaded(response));
      })
      .catch((error: any) => {
        dispatch(leaderboardItems.failed(error));
      });
  };
};
