import { LeaderboardItem, LeaderboardThunkAction } from '../../../components/leaderboard/ducks/types';
import { leaderboardItems } from '../../../components/leaderboard/ducks/actions';

export const getUsersLeaderboard = (previousDays: number): LeaderboardThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(leaderboardItems.loading());
    return apiClient.getUsersLeaderboard(previousDays)
    .then((response: LeaderboardItem[]) => {
      dispatch(leaderboardItems.loaded(response));
    })  
    .catch((error: any) => {
      dispatch(leaderboardItems.failed(error));
    });
  };
}