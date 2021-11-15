import moment from 'moment';
import { PrivilegeLevel, SignupRequest } from '../../../auth/ducks/types';
import { UploadFile } from 'antd/lib/upload/interface';

export interface AuthRequest {
  readonly password: string;
}

export interface ChangeUsernameRequest extends AuthRequest {
  readonly newUsername: string;
}

export interface ChangeEmailRequest extends AuthRequest {
  readonly newEmail: string;
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
}

export interface ChangePasswordFormValues extends ChangePasswordRequest {
  readonly confirmPassword: string;
}

export interface SignupFormValues extends SignupRequest {
  readonly confirmPassword: string;
}

export interface ChangePrivilegeRequest {
  readonly targetUserEmail: string;
  readonly newLevel: PrivilegeLevel;
  readonly password: string;
}

export interface RecordStewardshipRequest {
  readonly activityDate: moment.Moment;
  readonly stewardshipActivities: string[];
}
