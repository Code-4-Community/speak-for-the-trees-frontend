import {
  NO_USER_ID,
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from './types';
import { asyncRequestIsComplete } from '../../utils/asyncRequest';

export const getPrivilegeLevel = (
  tokens: UserAuthenticationReducerState['tokens'],
): PrivilegeLevel => {
  if (asyncRequestIsComplete(tokens)) {
    const payload = JSON.parse(atob(tokens.result.accessToken.split('.')[1]));
    return payload.privilegeLevel;
  }
  return PrivilegeLevel.NONE;
};

export const isLoggedIn = (
  tokens: UserAuthenticationReducerState['tokens'],
): boolean => {
  if (asyncRequestIsComplete(tokens)) {
    return true;
  }
  return false;
};

export const getUserID = (tokens: UserAuthenticationReducerState['tokens']) => {
  if (asyncRequestIsComplete(tokens)) {
    const payload = JSON.parse(atob(tokens.result.accessToken.split('.')[1]));
    return payload.userId || -1;
  }
  return NO_USER_ID;
};

export const isTokenValid = (token: string): boolean => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload && Math.round(Date.now() / 1000) < payload.exp;
};

export const getUserFirstName = (
  userData: UserAuthenticationReducerState['userData'],
): string => {
  if (asyncRequestIsComplete(userData)) {
    return userData.result.firstName;
  }
  return '';
};

export const getUserFullName = (
  userData: UserAuthenticationReducerState['userData'],
): string => {
  if (asyncRequestIsComplete(userData)) {
    return `${userData.result.firstName} ${userData.result.lastName}`;
  }
  return '';
};

export const getUserEmail = (
  userData: UserAuthenticationReducerState['userData'],
): string => {
  if (asyncRequestIsComplete(userData)) {
    return userData.result.email;
  }
  return '';
};

export const getUsername = (
  userData: UserAuthenticationReducerState['userData'],
): string => {
  if (asyncRequestIsComplete(userData)) {
    return userData.result.username;
  }
  return '';
};
