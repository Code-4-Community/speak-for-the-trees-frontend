import { PrivilegeLevel, TokenPayload } from './types';
import { AsyncRequest, AsyncRequestKinds } from '../../utils/asyncRequest';

export const getPrivilegeLevel = (
  tokens: AsyncRequest<TokenPayload, any>,
): PrivilegeLevel => {
  if (tokens.kind === AsyncRequestKinds.Completed) {
    const payload = JSON.parse(atob(tokens.result.accessToken.split('.')[1]));
    return payload.privilegeLevel;
  }
  return PrivilegeLevel.NONE;
};
