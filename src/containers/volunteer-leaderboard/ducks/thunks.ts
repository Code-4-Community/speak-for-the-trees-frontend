import {
  LeaderboardItem,
  LeaderboardThunkAction,
  LeaderboardPreviousDays
} from '../../../components/leaderboard/ducks/types';
import { 
  getLeaderboardAction,
} from '../../../components/leaderboard/ducks/actions';

export const getUsersLeaderboard = (
  previousDays: LeaderboardPreviousDays,
): LeaderboardThunkAction<void> => {
  const action = getLeaderboardAction(previousDays);
  return (dispatch, getState, { apiClient }) => {
    dispatch(action.loading());
    return apiClient
      .getUsersLeaderboard(previousDays)
      .then((response: LeaderboardItem[]) => {
        dispatch(action.loaded(response));
      })
      .catch((error: any) => {
        dispatch(action.failed(error));
      });
  };
};

