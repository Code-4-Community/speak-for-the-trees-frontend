import { UserData, UserDataThunkAction } from './types';
import { userData } from './actions';
import Client from '../../../api/protectedApiClient';

export const getUserData = (): UserDataThunkAction<void> => {
  return (dispatch, getState, { protectedApiClient }) => {
    dispatch(userData.loading());
    return Client.getUserData()
      .then((response: UserData) => {
        dispatch(userData.loaded(response));
      })
      .catch((error: any) => {
        dispatch(userData.failed(error));
      });
  };
};
