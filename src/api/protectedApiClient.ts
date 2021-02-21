import AppAxiosInstance from '../auth/axios';

export interface ProtectedApiClient {
  readonly makeReservation: (blockId: number, teamId?: number) => Promise<void>;
  readonly completeReservation: (
    blockId: number,
    teamId: number,
  ) => Promise<void>;
  readonly releaseReservation: (blockId: number) => Promise<void>;
  readonly uncompleteReservation: (blockId: number) => Promise<void>;
  readonly markReservationForQa: (blockId: number) => Promise<void>;
  readonly passReservationQa: (blockId: number) => Promise<void>;
  readonly failReservationQa: (blockId: number) => Promise<void>;
  readonly changePassword: (request: {
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

enum ProtectedApiClientRoutes {
  MAKE_RESERVATION = 'api/v1/protected/reservations/reserve',
  COMPLETE_RESERVATION = 'api/v1/protected/reservations/complete',
  RELEASE_RESERVATION = 'api/v1/protected/reservations/release',
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
}

enum AdminApiClientRoutes {
  UNCOMPLETE_RESERVATION = 'api/v1/protected/reservations/uncomplete',
  MARK_RESERVATION_FOR_QA = 'api/v1/protected/reservations/qa',
  PASS_RESERVATION_QA = 'api/v1/protected/reservations/pass_qa',
  FAIL_RESERVATION_QA = 'api/v1/protected/reservations/fail_qa',
}

const makeReservation = (blockId: number, teamId?: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_RESERVATION, {
    block_id: blockId,
    team_id: teamId,
  });
};

const completeReservation = (
  blockId: number,
  teamId?: number,
): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.COMPLETE_RESERVATION, {
    block_id: blockId,
    team_id: teamId,
  });
};

const releaseReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.RELEASE_RESERVATION, {
    block_id: blockId,
  });
};

// Admin routes

const uncompleteReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION, {
    block_id: blockId,
  });
};

const markReservationForQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA, {
    block_id: blockId,
  });
};

const passReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.PASS_RESERVATION_QA, {
    block_id: blockId,
  });
};

const failReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.FAIL_RESERVATION_QA, {
    block_id: blockId,
  });
};

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

const Client: ProtectedApiClient = Object.freeze({
  makeReservation,
  completeReservation,
  releaseReservation,
  uncompleteReservation,
  markReservationForQa,
  passReservationQa,
  failReservationQa,
  changePassword
});

export default Client;
