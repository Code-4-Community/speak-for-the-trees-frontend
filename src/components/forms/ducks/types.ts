import { SignupRequest } from '../../../auth/ducks/types';

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