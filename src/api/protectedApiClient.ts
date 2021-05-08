import AppAxiosInstance from '../auth/axios';
import { UserData } from '../auth/ducks/types';
import {
  TeamResponse,
  Applicant,
  CreateTeamRequest,
  AddGoalRequest,
  InviteUserRequest,
  TransferOwnershipRequest,
} from '../containers/teamPage/ducks/types';
import {
  AuthRequest,
  ChangeEmailRequest,
  ChangePasswordRequest,
  ChangeUsernameRequest,
} from '../components/forms/ducks/types';
import {
  ActivityRequest,
  AdoptedSites,
} from '../containers/treePage/ducks/types';

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
  readonly getUserData: () => Promise<UserData>;
  readonly createTeam: (request: CreateTeamRequest) => Promise<void>;
  readonly getTeams: () => Promise<TeamResponse[]>;
  readonly getTeam: (teamId: number) => Promise<TeamResponse>;
  readonly addGoal: (teamId: number, request: AddGoalRequest) => Promise<void>;
  readonly deleteGoal: (teamId: number, goalId: number) => Promise<void>;
  readonly inviteUser: (
    teamId: number,
    request: InviteUserRequest,
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
    request: TransferOwnershipRequest,
  ) => Promise<void>;
  readonly adoptSite: (siteId: number) => Promise<void>;
  readonly unadoptSite: (siteId: number) => Promise<void>;
  readonly recordStewardship: (
    siteId: number,
    request: ActivityRequest,
  ) => Promise<void>;
  readonly deleteStewardship: (activityId: number) => Promise<void>;
  readonly getAdoptedSites: () => Promise<AdoptedSites>;
}

export enum ProtectedApiClientRoutes {
  MAKE_RESERVATION = '/api/v1/protected/reservations/reserve',
  COMPLETE_RESERVATION = '/api/v1/protected/reservations/complete',
  RELEASE_RESERVATION = '/api/v1/protected/reservations/release',
  CHANGE_PASSWORD = '/api/v1/protected/user/change_password',
  CHANGE_USERNAME = '/api/v1/protected/user/change_username',
  CHANGE_EMAIL = '/api/v1/protected/user/change_email',
  DELETE_USER = '/api/v1/protected/user/delete',
  GET_USER_DATA = '/api/v1/protected/user/data',
  CREATE_TEAM = '/api/v1/protected/teams/create',
  GET_TEAMS = '/api/v1/protected/teams/',
  GET_ADOPTED_SITES = '/api/v1/protected/sites/adopted_sites',
}

export enum AdminApiClientRoutes {
  UNCOMPLETE_RESERVATION = '/api/v1/protected/reservations/uncomplete',
  MARK_RESERVATION_FOR_QA = '/api/v1/protected/reservations/qa',
  PASS_RESERVATION_QA = '/api/v1/protected/reservations/pass_qa',
  FAIL_RESERVATION_QA = '/api/v1/protected/reservations/fail_qa',
  CHANGE_PRIVILEGE = '/api/v1/protected/user/change_privilege',
}

const baseTeamRoute = '/api/v1/protected/teams/';
const baseSiteRoute = '/api/v1/protected/sites/';

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
  ADOPT_SITE: (siteId: number): string => `${baseSiteRoute}${siteId}/adopt`,
  UNADOPT_SITE: (siteId: number): string => `${baseSiteRoute}${siteId}/unadopt`,
  RECORD_STEWARDSHIP: (siteId: number): string =>
    `${baseSiteRoute}${siteId}/record_stewardship`,
  DELETE_STEWARDSHIP: (actvityId: number): string =>
    `${baseSiteRoute}remove_stewardship/${actvityId}`,
};

const makeReservation = (blockId: number, teamId?: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_RESERVATION, {
    block_id: blockId,
    team_id: teamId,
  })
    .then((res) => res.data)
    .catch((err) => err);
};

const completeReservation = (
  blockId: number,
  teamId?: number,
): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.COMPLETE_RESERVATION, {
    block_id: blockId,
    team_id: teamId,
  })
    .then((res) => res.data)
    .catch((err) => err);
};

const releaseReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.RELEASE_RESERVATION, {
    block_id: blockId,
  })
    .then((res) => res.data)
    .catch((err) => err);
};

// Admin routes

const uncompleteReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION, {
    block_id: blockId,
  })
    .then((res) => res.data)
    .catch((err) => err);
};

const markReservationForQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA, {
    block_id: blockId,
  })
    .then((res) => res.data)
    .catch((err) => err);
};

const passReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.PASS_RESERVATION_QA, {
    block_id: blockId,
  })
    .then((res) => res.data)
    .catch((err) => err);
};

const failReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.FAIL_RESERVATION_QA, {
    block_id: blockId,
  })
    .then((res) => res.data)
    .catch((err) => err);
};

const changePassword = (request: ChangePasswordRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  );
};

const changeUsername = (request: ChangeUsernameRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_USERNAME,
    request,
  );
};

const changeEmail = (request: ChangeEmailRequest): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.CHANGE_EMAIL, request);
};

const deleteUser = (request: AuthRequest): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.DELETE_USER, request);
};

const changePrivilegeLevel = (request: {
  targetUserEmail: string;
  newLevel: string;
  password: string;
}): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.CHANGE_PRIVILEGE, request)
    .then((res) => res.data)
    .catch((err) => err);
};

const getUserData = (): Promise<UserData> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_USER_DATA)
    .then((res) => res.data)
    .catch((err) => err);
};

const createTeam = (request: CreateTeamRequest): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.CREATE_TEAM, request)
    .then((res) => res.data)
    .catch((err) => err);
};

const getTeams = (): Promise<TeamResponse[]> => {
  return AppAxiosInstance.get(baseTeamRoute)
    .then((res) => res.data)
    .catch((err) => err);
};

const getTeam = (teamId: number): Promise<TeamResponse> => {
  return AppAxiosInstance.get(ParameterizedApiRoutes.GET_TEAM(teamId))
    .then((res) => res.data)
    .catch((err) => err);
};

const addGoal = (teamId: number, request: AddGoalRequest): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.ADD_GOAL(teamId), request)
    .then((res) => res.data)
    .catch((err) => err);
};

const deleteGoal = (teamId: number, goalId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.DELETE_GOAL(teamId, goalId),
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const inviteUser = (
  teamId: number,
  request: InviteUserRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.INVITE_USER(teamId),
    request,
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const getApplicants = (teamId: number): Promise<Applicant[]> => {
  return AppAxiosInstance.get(ParameterizedApiRoutes.GET_APPLICANTS(teamId))
    .then((res) => res.data)
    .catch((err) => err);
};

const applyToTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.APPLY_TO_TEAM(teamId))
    .then((res) => res.data)
    .catch((err) => err);
};

const approveUser = (teamId: number, userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.APPROVE_USER(teamId, userId),
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const rejectUser = (teamId: number, userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.REJECT_USER(teamId, userId),
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const kickUser = (teamId: number, memberId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.KICK_USER(teamId, memberId),
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const leaveTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.LEAVE_TEAM(teamId))
    .then((res) => res.data)
    .catch((err) => err);
};

const disbandTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.DISBAND_TEAM(teamId))
    .then((res) => res.data)
    .catch((err) => err);
};

const transferOwnership = (
  teamId: number,
  request: TransferOwnershipRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.TRANSFER_OWNERSHIP(teamId),
    request,
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const adoptSite = (siteId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.ADOPT_SITE(siteId)).then(
    (res) => res.data,
  );
};

const unadoptSite = (siteId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.UNADOPT_SITE(siteId),
  ).then((res) => res.data);
};

const recordStewardship = (
  siteId: number,
  request: ActivityRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.RECORD_STEWARDSHIP(siteId),
    request,
  ).then((res) => res.data);
};

const deleteStewardship = (siteId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.DELETE_STEWARDSHIP(siteId),
  )
    .then((res) => res.data)
    .catch((err) => err);
};

const getAdoptedSites = (): Promise<AdoptedSites> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_ADOPTED_SITES)
    .then((res) => res.data)
    .catch((err) => err);
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
  getUserData,
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
  adoptSite,
  unadoptSite,
  recordStewardship,
  deleteStewardship,
  getAdoptedSites,
});

export default Client;
