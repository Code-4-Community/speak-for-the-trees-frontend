import {
  VolunteerLeaderboardItem,
  VolunteerLeaderboardThunkAction,
} from './types';
import { volunteerLeaderboardItems } from './actions';

export const getUsersLeaderboard = (
  previousDays: number | null,
): VolunteerLeaderboardThunkAction<void> => {
  return (dispatch, getState, { apiClient }) => {
    dispatch(volunteerLeaderboardItems.loading());
    return apiClient
      .getUsersLeaderboard(previousDays)
      .then((response: VolunteerLeaderboardItem[]) => {
        dispatch(volunteerLeaderboardItems.loaded(response));
      })
      .catch((error: any) => {
        dispatch(volunteerLeaderboardItems.failed(error));
      });
  };
};
