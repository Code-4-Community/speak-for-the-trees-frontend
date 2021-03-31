import { genericAsyncActions } from '../../../utils/asyncRequest';
import { UserData } from './types';

export const userData = genericAsyncActions<UserData, any>();

export type UserDataAction =
  | ReturnType<typeof userData.loading>
  | ReturnType<typeof userData.loaded>
  | ReturnType<typeof userData.failed>;
