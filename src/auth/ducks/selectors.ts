import {
  NO_USER_ID,
  PrivilegeLevel,
  UserAuthenticationReducerState,
} from './types';
import {
  asyncRequestIsComplete,
  AsyncRequestKinds,
} from '../../utils/asyncRequest';

export const getPrivilegeLevel = (
  tokens: UserAuthenticationReducerState['tokens'],
): PrivilegeLevel => {
  if (tokens.kind === AsyncRequestKinds.Completed) {
    const payload = JSON.parse(atob(tokens.result.accessToken.split('.')[1]));
    return payload.privilegeLevel;
  }
  return PrivilegeLevel.NONE;
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
