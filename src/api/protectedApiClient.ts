import AppAxiosInstance from '../auth/axios';

export interface ProtectedApiClient {
  readonly makeReservation: (
    block_id: number,
    team_id?: number,
  ) => Promise<void>;
  readonly completeReservation: (
    block_id: number,
    team_id?: number,
  ) => Promise<void>;
  readonly releaseReservation: (block_id: number) => Promise<void>;
  readonly uncompleteReservation: (block_id: number) => Promise<void>;
  readonly markReservationForQa: (block_id: number) => Promise<void>;
  readonly passReservationQa: (block_id: number) => Promise<void>;
  readonly failReservationQa: (block_id: number) => Promise<void>;
}

enum ProtectedApiClientRoutes {
  MAKE_RESERVATION = 'api/v1/protected/reservations/reserve',
  COMPLETE_RESERVATION = 'api/v1/protected/reservations/complete',
  RELEASE_RESERVATION = 'api/v1/protected/reservations/release',
}

enum AdminApiClientRoutes {
  UNCOMPLETE_RESERVATION = 'api/v1/protected/reservations/uncomplete',
  MARK_RESERVATION_FOR_QA = 'api/v1/protected/reservations/qa',
  PASS_RESERVATION_QA = 'api/v1/protected/reservations/pass_qa',
  FAIL_RESERVATION_QA = 'api/v1/protected/reservations/fail_qa',
}

const makeReservation = (block_id: number, team_id?: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_RESERVATION, {
    block_id,
    team_id,
  });
};

const completeReservation = (
  block_id: number,
  team_id?: number,
): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.COMPLETE_RESERVATION, {
    block_id,
    team_id,
  });
};

const releaseReservation = (block_id: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.RELEASE_RESERVATION, {
    block_id,
  });
};

// Admin routes

const uncompleteReservation = (block_id: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION, {
    block_id,
  });
};

const markReservationForQa = (block_id: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA, {
    block_id,
  });
};

const passReservationQa = (block_id: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.PASS_RESERVATION_QA, {
    block_id,
  });
};

const failReservationQa = (block_id: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.FAIL_RESERVATION_QA, {
    block_id,
  });
};

const Client: ProtectedApiClient = Object.freeze({
  makeReservation,
  completeReservation,
  releaseReservation,
  uncompleteReservation,
  markReservationForQa,
  passReservationQa,
  failReservationQa,
});

export default Client;
