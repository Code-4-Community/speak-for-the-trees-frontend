import { AsyncRequest } from '../../../utils/asyncRequest';
import { ThunkAction } from 'redux-thunk';
import { C4CState } from '../../../store';
import { ProtectedApiExtraArgs } from '../../../api/protectedApiClient';
import { UserDataAction } from './actions';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserDataReducerState {
  readonly userData: AsyncRequest<UserData, any>;
}

export type UserDataThunkAction<R> = ThunkAction<
  R,
  C4CState,
  ProtectedApiExtraArgs,
  UserDataAction
>;
