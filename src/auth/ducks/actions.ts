import { genericAsyncActions } from '../../utils/asyncRequest';
import { TokenPayload } from './types';

export const authenticateUser = genericAsyncActions<TokenPayload, any>();

export const logoutUser = genericAsyncActions<void, void>();

export type UserAuthenticationActions =
  | ReturnType<typeof authenticateUser.loading>
  | ReturnType<typeof authenticateUser.loaded>
  | ReturnType<typeof authenticateUser.failed>
  | ReturnType<typeof logoutUser.loading>
  | ReturnType<typeof logoutUser.loaded>
  | ReturnType<typeof logoutUser.failed>;
