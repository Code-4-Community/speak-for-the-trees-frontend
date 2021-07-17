import { genericAsyncActions } from '../../utils/asyncRequest';
import { TokenPayload, UserData } from './types';

export const authenticateUser = genericAsyncActions<TokenPayload, any>();

export const userData = genericAsyncActions<UserData, any>();

export const logoutUser = genericAsyncActions<void, void>();

export type UserAuthenticationActions =
  | ReturnType<typeof authenticateUser.loading>
  | ReturnType<typeof authenticateUser.loaded>
  | ReturnType<typeof authenticateUser.failed>
  | ReturnType<typeof logoutUser.loading>
  | ReturnType<typeof logoutUser.loaded>
  | ReturnType<typeof logoutUser.failed>
  | ReturnType<typeof userData.loading>
  | ReturnType<typeof userData.loaded>
  | ReturnType<typeof userData.failed>;
