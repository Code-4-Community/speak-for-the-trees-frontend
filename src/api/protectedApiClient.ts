import AppAxiosInstance from '../auth/axios';

export interface ProtectedApiClient {
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
  readonly changeUsername: (request: {
    newUsername: string;
    password: string;
  }) => Promise<void>;
  readonly deleteUser: (request: { password: string }) => Promise<void>;
}

enum ProtectedApiClientRoutes {
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  CHANGE_USERNAME = '/api/v1/protected/user/change_username',
  DELETE_USER = '/api/v1/protected/user/delete',
}

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r)
    .catch((e) => e);
};

const changeUsername = (request: {
  newUsername: string;
  password: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_USERNAME,
    request,
  )
    .then((r) => r)
    .catch((e) => e);
};

const deleteUser = (request: { password: string }): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.DELETE_USER, request)
    .then((r) => r)
    .catch((e) => e);
};

const Client: ProtectedApiClient = Object.freeze({
  changePassword,
  changeUsername,
  deleteUser,
});

export default Client;
