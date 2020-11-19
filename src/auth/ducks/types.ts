import { ThunkAction } from 'redux-thunk';
import { AuthClient } from '../authClient';
import { TokenService } from '../token';
import { AsyncRequest } from '../../utils/asyncRequest';
import { UserAuthenticationActions } from './actions';
import { C4CState } from '../../store';

export interface UserAuthenticationReducerState {
  readonly tokens: AsyncRequest<TokenPayload, any>;
}

export interface UserAuthenticationExtraArgs {
  readonly authClient: AuthClient;
  readonly tokenService: TokenService;
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
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
}

export interface TokenPayload {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface RefreshTokenResponse {
  readonly freshAccessToken: string;
}

export enum PrivilegeLevel {
  NONE = -1,
  STANDARD = 0,
  ADMIN = 1,
}

export const NO_USER_ID = -1;
