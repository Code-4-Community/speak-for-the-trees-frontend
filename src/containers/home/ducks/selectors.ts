import { asyncRequestIsComplete } from '../../../utils/asyncRequest';
import { UserDataReducerState } from './types';

export const getUserFirstName = (
  userData: UserDataReducerState['userData'],
): string => {
  if (asyncRequestIsComplete(userData)) {
    return userData.result.firstName;
  }
  return '';
};

export const getUserFullName = (
  userData: UserDataReducerState['userData'],
): string => {
  if (asyncRequestIsComplete(userData)) {
    return `${userData.result.firstName} ${userData.result.lastName}`;
  }
  return '';
};

export const getUserEmail = (
  userData: UserDataReducerState['userData'],
): string => {
  if (asyncRequestIsComplete(userData)) {
    return userData.result.email;
  }
  return '';
};
