import { ThunkAction } from 'redux-thunk';
import { AuthClient } from '../authClient';
import { AsyncRequest } from '../../utils/asyncRequest';
import { UserAuthenticationActions } from './actions';
import { C4CState } from '../../store';
import { ProtectedApiClient } from '../../api/protectedApiClient';

export interface UserAuthenticationReducerState {
  readonly tokens: AsyncRequest<TokenPayload, any>;
  readonly userData: AsyncRequest<UserData, any>;
}

export interface UserAuthenticationExtraArgs {
  readonly authClient: AuthClient;
  readonly protectedApiClient: ProtectedApiClient;
}

export type UserAuthenticationThunkAction<R> = ThunkAction<
  R,
  C4CState,
  UserAuthenticationExtraArgs,
  UserAuthenticationActions
>;

export interface LoginRequest {
  readonly email: string;
  readonly password: string;
}

export interface SignupRequest {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface ForgotPasswordRequest {
  readonly email: string;
}

export interface ForgotPasswordResetRequest {
  readonly newPassword: string;
  readonly secretKey: string;
}

export interface TokenPayload {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface RefreshTokenResponse {
  readonly freshAccessToken: string;
}

export enum PrivilegeLevel {
  NONE = 'none',
  STANDARD = 'standard',
  ADMIN = 'admin',
  SUPER_ADMIN = 'superAdmin',
}

export const NO_USER_ID = -1;

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}
