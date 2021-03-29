import AppAxiosInstance from '../auth/axios';
import {
  TeamResponse,
  UserInvite,
  Applicant,
} from '../containers/teamPage/ducks/types';

export interface ProtectedApiExtraArgs {
  readonly protectedApiClient: ProtectedApiClient;
}

export interface ProtectedApiClient {
  readonly makeReservation: (blockId: number, teamId?: number) => Promise<void>;
  readonly completeReservation: (
    blockId: number,
    teamId?: number,
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
  readonly changeUsername: (request: {
    newUsername: string;
    password: string;
  }) => Promise<void>;
  readonly changeEmail: (request: {
    newEmail: string;
    password: string;
  }) => Promise<void>;
  readonly deleteUser: (request: { password: string }) => Promise<void>;
  readonly changePrivilegeLevel: (request: {
    targetUserEmail: string;
    newLevel: string;
    password: string;
  }) => Promise<void>;
  readonly createTeam: (request: {
    name: string;
    bio: string;
    inviteEmails: string[];
  }) => Promise<void>;
  readonly getTeams: () => Promise<TeamResponse[]>;
  readonly getTeam: (teamId: number) => Promise<TeamResponse>;
  readonly addGoal: (
    teamId: number,
    request: {
      goal: number;
      startAt: string;
      completeBy: string;
    },
  ) => Promise<void>;
  readonly deleteGoal: (teamId: number, goalId: number) => Promise<void>;
  readonly inviteUser: (
    teamIId: number,
    request: {
      invites: UserInvite[];
    },
  ) => Promise<void>;
  readonly getApplicants: (teamId: number) => Promise<Applicant[]>;
  readonly applyToTeam: (teamId: number) => Promise<void>;
  readonly approveUser: (teamId: number, userId: number) => Promise<void>;
  readonly rejectUser: (teamId: number, userId: number) => Promise<void>;
  readonly kickUser: (teamId: number, memberId: number) => Promise<void>;
  readonly leaveTeam: (teamId: number) => Promise<void>;
  readonly disbandTeam: (teamId: number) => Promise<void>;
  readonly transferOwnership: (
    teamId: number,
    request: { newLeaderId: number },
  ) => Promise<void>;
}

export enum ProtectedApiClientRoutes {
  MAKE_RESERVATION = '/api/v1/protected/reservations/reserve',
  COMPLETE_RESERVATION = '/api/v1/protected/reservations/complete',
  RELEASE_RESERVATION = '/api/v1/protected/reservations/release',
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  CHANGE_USERNAME = '/api/v1/protected/user/change_username',
  CHANGE_EMAIL = '/api/v1/protected/user/change_email',
  DELETE_USER = '/api/v1/protected/user',
  CREATE_TEAM = '/api/v1/protected/teams/create',
  GET_TEAMS = '/api/v1/protected/teams/',
}

export enum AdminApiClientRoutes {
  UNCOMPLETE_RESERVATION = '/api/v1/protected/reservations/uncomplete',
  MARK_RESERVATION_FOR_QA = '/api/v1/protected/reservations/qa',
  PASS_RESERVATION_QA = '/api/v1/protected/reservations/pass_qa',
  FAIL_RESERVATION_QA = '/api/v1/protected/reservations/fail_qa',
  CHANGE_PRIVILEGE = '/api/v1/protected/user/change_privilege',
}

const baseTeamRoute = '/api/v1/protected/teams/';

export const ParameterizedApiRoutes = {
  GET_TEAM: (teamId: number): string => `${baseTeamRoute}${teamId}`,
  ADD_GOAL: (teamId: number): string => `${baseTeamRoute}${teamId}/add_goal`,
  DELETE_GOAL: (teamId: number, goalId: number): string =>
    `${baseTeamRoute}${teamId}/delete_goal/${goalId}`,
  INVITE_USER: (teamId: number): string => `${baseTeamRoute}${teamId}/invite`,
  GET_APPLICANTS: (teamId: number): string =>
    `${baseTeamRoute}${teamId}/applicants`,
  APPLY_TO_TEAM: (teamId: number): string => `${baseTeamRoute}${teamId}/apply`,
  APPROVE_USER: (teamId: number, userId: number): string =>
    `${baseTeamRoute}${teamId}/applicants/${userId}/approve`,
  REJECT_USER: (teamId: number, userId: number): string =>
    `${baseTeamRoute}${teamId}/applicants/${userId}/reject`,
  KICK_USER: (teamId: number, memberId: number): string =>
    `${baseTeamRoute}${teamId}/members/${memberId}/kick`,
  LEAVE_TEAM: (teamId: number): string => `${baseTeamRoute}${teamId}/leave`,
  DISBAND_TEAM: (teamId: number): string => `${baseTeamRoute}${teamId}/disband`,
  TRANSFER_OWNERSHIP: (teamId: number): string =>
    `${baseTeamRoute}${teamId}/transfer_ownership`,
};

const makeReservation = (blockId: number, teamId?: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_RESERVATION, {
    block_id: blockId,
    team_id: teamId,
  })
    .then((r) => r.data)
    .catch((e) => e);
};

const completeReservation = (
  blockId: number,
  teamId?: number,
): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.COMPLETE_RESERVATION, {
    block_id: blockId,
    team_id: teamId,
  })
    .then((r) => r.data)
    .catch((e) => e);
};

const releaseReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.RELEASE_RESERVATION, {
    block_id: blockId,
  })
    .then((r) => r.data)
    .catch((e) => e);
};

// Admin routes

const uncompleteReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION, {
    block_id: blockId,
  })
    .then((r) => r.data)
    .catch((e) => e);
};

const markReservationForQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA, {
    block_id: blockId,
  })
    .then((r) => r.data)
    .catch((e) => e);
};

const passReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.PASS_RESERVATION_QA, {
    block_id: blockId,
  })
    .then((r) => r.data)
    .catch((e) => e);
};

const failReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.FAIL_RESERVATION_QA, {
    block_id: blockId,
  })
    .then((r) => r.data)
    .catch((e) => e);
};

const changePassword = (request: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  )
    .then((r) => r.data)
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
    .then((r) => r.data)
    .catch((e) => e);
};

const changeEmail = (request: {
  newEmail: string;
  password: string;
}): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.CHANGE_EMAIL, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const deleteUser = (request: { password: string }): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.DELETE_USER, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const changePrivilegeLevel = (request: {
  targetUserEmail: string;
  newLevel: string;
  password: string;
}): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.CHANGE_PRIVILEGE, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const createTeam = (request: {
  name: string;
  bio: string;
  inviteEmails: string[];
}): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.CREATE_TEAM, request)
    .then((r) => r.data)
    .catch((e) => e);
};

const getTeams = (): Promise<TeamResponse[]> => {
  return AppAxiosInstance.get(baseTeamRoute)
    .then((r) => r.data)
    .catch((e) => e);
};

const getTeam = (teamId: number): Promise<TeamResponse> => {
  return AppAxiosInstance.get(ParameterizedApiRoutes.GET_TEAM(teamId))
    .then((r) => r.data)
    .catch((e) => e);
};

const addGoal = (
  teamId: number,
  request: {
    goal: number;
    startAt: string;
    completeBy: string;
  },
): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.ADD_GOAL(teamId), request)
    .then((r) => r.data)
    .catch((e) => e);
};

const deleteGoal = (teamId: number, goalId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.DELETE_GOAL(teamId, goalId),
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const inviteUser = (
  teamId: number,
  request: {
    invites: UserInvite[];
  },
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.INVITE_USER(teamId),
    request,
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const getApplicants = (teamId: number): Promise<Applicant[]> => {
  return AppAxiosInstance.get(ParameterizedApiRoutes.GET_APPLICANTS(teamId))
    .then((r) => r.data)
    .catch((e) => e);
};

const applyToTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.APPLY_TO_TEAM(teamId))
    .then((r) => r.data)
    .catch((e) => e);
};

const approveUser = (teamId: number, userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.APPROVE_USER(teamId, userId),
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const rejectUser = (teamId: number, userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.REJECT_USER(teamId, userId),
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const kickUser = (teamId: number, memberId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.KICK_USER(teamId, memberId),
  )
    .then((r) => r.data)
    .catch((e) => e);
};

const leaveTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.LEAVE_TEAM(teamId))
    .then((r) => r.data)
    .catch((e) => e);
};

const disbandTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.DISBAND_TEAM(teamId))
    .then((r) => r.data)
    .catch((e) => e);
};

const transferOwnership = (
  teamId: number,
  request: { newLeaderId: number },
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.TRANSFER_OWNERSHIP(teamId),
    request,
  )
    .then((r) => r.data)
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
  changePassword,
  changeUsername,
  changeEmail,
  deleteUser,
  changePrivilegeLevel,
  createTeam,
  getTeams,
  getTeam,
  addGoal,
  deleteGoal,
  inviteUser,
  getApplicants,
  applyToTeam,
  approveUser,
  rejectUser,
  kickUser,
  leaveTeam,
  disbandTeam,
  transferOwnership,
});

export default Client;
