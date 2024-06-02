import { AppAxiosInstance } from './apiClient';
import { SignupRequest, UserData } from '../auth/ducks/types';
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
  ChangePrivilegeRequest,
  ChangeUsernameRequest,
  EditSiteRequest,
  SiteEntriesRequest,
  AddSiteRequest,
  AddSitesRequest,
  NameSiteEntryRequest,
  SendEmailRequest,
  AddTemplateRequest,
} from '../components/forms/ducks/types';
import {
  ActivityRequest,
  ReportSiteRequest,
  AdoptedSites,
} from '../containers/treePage/ducks/types';
import {
  AdoptionReport,
  StewardshipReport,
} from '../containers/reports/ducks/types';
import {
  FilterSitesParams,
  FilterSitesResponse,
  TemplateNamesResponse,
  LoadTemplateResponse,
} from '../containers/email/types';
import {
  FilterSiteImagesParams,
  FilterSiteImagesResponse,
} from '../containers/reviewImages/types';

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
  readonly changePrivilegeLevel: (
    request: ChangePrivilegeRequest,
  ) => Promise<void>;
  readonly createChild: (request: SignupRequest) => Promise<void>;
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
  readonly forceUnadoptSite: (siteId: number) => Promise<void>;
  readonly recordStewardship: (
    siteId: number,
    request: ActivityRequest,
  ) => Promise<void>;
  readonly editStewardship: (
    activityId: number,
    request: ActivityRequest,
  ) => Promise<void>;
  readonly deleteStewardship: (activityId: number) => Promise<void>;
  readonly getAdoptedSites: () => Promise<AdoptedSites>;
  readonly editSite: (
    siteId: number,
    request: EditSiteRequest,
  ) => Promise<void>;
  readonly updateSite: (
    siteId: number,
    request: SiteEntriesRequest,
  ) => Promise<void>;
  readonly editSiteEntry: (
    entryId: number,
    request: SiteEntriesRequest,
  ) => Promise<void>;
  readonly getAdoptionReport: () => Promise<AdoptionReport>;
  readonly getAdoptionReportCsv: (
    previousDays: number | null,
  ) => Promise<string>;
  readonly getStewardshipReport: () => Promise<StewardshipReport>;
  readonly getStewardshipReportCsv: (
    previousDays: number | null,
  ) => Promise<string>;
  readonly addSite: (request: AddSiteRequest) => Promise<void>;
  readonly nameSiteEntry: (
    siteId: number,
    request: NameSiteEntryRequest,
  ) => Promise<void>;
  readonly addSites: (request: AddSitesRequest) => Promise<void>;
  readonly sendEmail: (request: SendEmailRequest) => Promise<void>;
  readonly deleteImage: (imageId: number) => Promise<void>;
  readonly filterSites: (
    params: FilterSitesParams,
  ) => Promise<FilterSitesResponse>;
  readonly filterSiteImages: (
    params: FilterSiteImagesParams,
  ) => Promise<FilterSiteImagesResponse>;
  readonly approveImage: (imageId: number) => Promise<void>;
  readonly rejectImage: (imageId: number, reason: string) => Promise<void>;
  readonly uploadImage: (
    siteEntryId: number,
    imageFile: string | ArrayBuffer,
    anon: boolean,
  ) => Promise<void>;
  readonly getEmailTemplateNames: () => Promise<TemplateNamesResponse>;
  readonly loadEmailTemplateContent: (
    templateName: string,
  ) => Promise<LoadTemplateResponse>;
  readonly addTemplate: (request: AddTemplateRequest) => Promise<void>;
  readonly reportSiteForIssues: (
    siteId: number,
    request: ReportSiteRequest,
  ) => Promise<void>;
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
  ADD_SITE = '/api/v1/protected/sites/add',
}

export enum AdminApiClientRoutes {
  UNCOMPLETE_RESERVATION = '/api/v1/protected/reservations/uncomplete',
  MARK_RESERVATION_FOR_QA = '/api/v1/protected/reservations/qa',
  PASS_RESERVATION_QA = '/api/v1/protected/reservations/pass_qa',
  FAIL_RESERVATION_QA = '/api/v1/protected/reservations/fail_qa',
  CHANGE_PRIVILEGE = '/api/v1/protected/user/change_privilege',
  CREATE_CHILD = '/api/v1/protected/user/create_child',
  GET_ADOPTION_REPORT = '/api/v1/protected/report/adoption',
  GET_ADOPTION_REPORT_CSV = '/api/v1/protected/report/csv/adoption',
  GET_STEWARDSHIP_REPORT = '/api/v1/protected/report/stewardship',
  GET_STEWARDSHIP_REPORT_CSV = '/api/v1/protected/report/csv/adoption',
  ADD_SITES = '/api/v1/protected/sites/add_sites',
  SEND_EMAIL = '/api/v1/protected/neighborhoods/send_email',
  GET_TEMPLATE_NAMES = '/api/v1/protected/emailer/template_names',
  ADD_TEMPLATE = '/api/v1/protected/emailer/add_template',
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
  FORCE_UNADOPT_SITE: (siteId: number): string =>
    `${baseSiteRoute}${siteId}/force_unadopt`,
  RECORD_STEWARDSHIP: (siteId: number): string =>
    `${baseSiteRoute}${siteId}/record_stewardship`,
  EDIT_STEWARDSHIP: (activityId: number): string =>
    `${baseSiteRoute}edit_stewardship/${activityId}`,
  DELETE_STEWARDSHIP: (actvityId: number): string =>
    `${baseSiteRoute}delete_stewardship/${actvityId}`,
  UPDATE_SITE: (siteId: number): string => `${baseSiteRoute}${siteId}/update`,
  NAME_SITE_ENTRY: (siteId: number): string =>
    `${baseSiteRoute}${siteId}/name_entry`,
  UPLOAD_IMAGE: (siteEntryId: number): string =>
    `${baseSiteRoute}site_image/${siteEntryId}`,
  DELETE_IMAGE: (imageId: number): string =>
    `${baseSiteRoute}site_image/${imageId}`,
  REPORT_SITE: (siteId: number): string => `${baseSiteRoute}${siteId}/report`,
};

export const ParameterizedAdminApiRoutes = {
  EDIT_SITE: (siteId: number): string => `${baseSiteRoute}${siteId}/edit`,
  GET_ADOPTION_REPORT_CSV: (previousDays: number): string =>
    `/api/v1/protected/report/csv/adoption?previousDays=${previousDays}`,
  GET_STEWARDSHIP_REPORT_CSV: (previousDays: number): string =>
    `/api/v1/protected/report/csv/stewardship?previousDays=${previousDays}`,
  EDIT_SITE_ENTRY: (entryId: number): string =>
    `${baseSiteRoute}edit_entry/${entryId}`,
  FILTER_SITES: (params: FilterSitesParams): string =>
    `${baseSiteRoute}filter_sites?activityCountMin=${params.activityCountMin}${
      params.treeCommonNames ? `&treeCommonNames=${params.treeCommonNames}` : ''
    }${params.adoptedStart ? `&adoptedStart=${params.adoptedStart}` : ''}${
      params.adoptedEnd ? `&adoptedEnd=${params.adoptedEnd}` : ''
    }${
      params.lastActivityStart
        ? `&lastActivityStart=${params.lastActivityStart}`
        : ''
    }${
      params.lastActivityEnd ? `&lastActivityEnd=${params.lastActivityEnd}` : ''
    }${
      params.neighborhoodIds ? `&neighborhoodIds=${params.neighborhoodIds}` : ''
    }${
      params.activityCountMax !== null
        ? `&activityCountMax=${params.activityCountMax}`
        : ''
    }`,
  FILTER_SITE_IMAGES: (params: FilterSiteImagesParams): string =>
    `${baseSiteRoute}unapproved_images${
      params.siteIds ||
      params.submittedStart ||
      params.submittedEnd ||
      params.neighborhoods
        ? '?'
        : ''
    }
    ${params.siteIds ? `&siteIds=${params.siteIds}` : ''}${
      params.submittedStart ? `&submittedStart=${params.submittedStart}` : ''
    }${params.submittedEnd ? `&submittedEnd=${params.submittedEnd}` : ''}${
      params.neighborhoods ? `&neighborhoodIds=${params.neighborhoods}` : ''
    }`,
  APPROVE_IMAGE: (imageId: number): string =>
    `api/v1/protected/sites/approve_image/${imageId}`,
  REJECT_IMAGE: (imageId: number, reason: string): string =>
    `api/v1/protected/sites/reject_image/${imageId}?reason=${reason}`,
  LOAD_TEMPLATE: (templateName: string): string =>
    `api/v1/protected/emailer/load_template/${templateName}`,
};

const makeReservation = (blockId: number, teamId?: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.MAKE_RESERVATION, {
    blockID: blockId,
    teamID: teamId,
  }).then((res) => res.data);
};

const completeReservation = (
  blockId: number,
  teamId?: number,
): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.COMPLETE_RESERVATION, {
    blockID: blockId,
    teamID: teamId,
  }).then((res) => res.data);
};

const releaseReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.RELEASE_RESERVATION, {
    blockID: blockId,
  }).then((res) => res.data);
};

// Admin routes

const uncompleteReservation = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.UNCOMPLETE_RESERVATION, {
    blockID: blockId,
  }).then((res) => res.data);
};

const markReservationForQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.MARK_RESERVATION_FOR_QA, {
    blockID: blockId,
  }).then((res) => res.data);
};

const passReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.PASS_RESERVATION_QA, {
    blockID: blockId,
  }).then((res) => res.data);
};

const failReservationQa = (blockId: number): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.FAIL_RESERVATION_QA, {
    blockID: blockId,
  }).then((res) => res.data);
};

const changePassword = (request: ChangePasswordRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_PASSWORD,
    request,
  ).then((res) => res.data);
};

const changeUsername = (request: ChangeUsernameRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_USERNAME,
    request,
  ).then((res) => res.data);
};

const changeEmail = (request: ChangeEmailRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CHANGE_EMAIL,
    request,
  ).then((res) => res.data);
};

const deleteUser = (request: AuthRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.DELETE_USER,
    request,
  ).then((res) => res.data);
};

const changePrivilegeLevel = (
  request: ChangePrivilegeRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    AdminApiClientRoutes.CHANGE_PRIVILEGE,
    request,
  ).then((res) => res.data);
};

const createChild = (request: SignupRequest): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.CREATE_CHILD, request).then(
    (res) => res.data,
  );
};

const getUserData = (): Promise<UserData> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_USER_DATA).then(
    (res) => res.data,
  );
};

const createTeam = (request: CreateTeamRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ProtectedApiClientRoutes.CREATE_TEAM,
    request,
  ).then((res) => res.data);
};

const getTeams = (): Promise<TeamResponse[]> => {
  return AppAxiosInstance.get(baseTeamRoute).then((res) => res.data);
};

const getTeam = (teamId: number): Promise<TeamResponse> => {
  return AppAxiosInstance.get(ParameterizedApiRoutes.GET_TEAM(teamId)).then(
    (res) => res.data,
  );
};

const addGoal = (teamId: number, request: AddGoalRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.ADD_GOAL(teamId),
    request,
  ).then((res) => res.data);
};

const deleteGoal = (teamId: number, goalId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.DELETE_GOAL(teamId, goalId),
  ).then((res) => res.data);
};

const inviteUser = (
  teamId: number,
  request: InviteUserRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.INVITE_USER(teamId),
    request,
  ).then((res) => res.data);
};

const getApplicants = (teamId: number): Promise<Applicant[]> => {
  return AppAxiosInstance.get(
    ParameterizedApiRoutes.GET_APPLICANTS(teamId),
  ).then((res) => res.data);
};

const applyToTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.APPLY_TO_TEAM(teamId),
  ).then((res) => res.data);
};

const approveUser = (teamId: number, userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.APPROVE_USER(teamId, userId),
  ).then((res) => res.data);
};

const rejectUser = (teamId: number, userId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.REJECT_USER(teamId, userId),
  ).then((res) => res.data);
};

const kickUser = (teamId: number, memberId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.KICK_USER(teamId, memberId),
  ).then((res) => res.data);
};

const leaveTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(ParameterizedApiRoutes.LEAVE_TEAM(teamId)).then(
    (res) => res.data,
  );
};

const disbandTeam = (teamId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.DISBAND_TEAM(teamId),
  ).then((res) => res.data);
};

const transferOwnership = (
  teamId: number,
  request: TransferOwnershipRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.TRANSFER_OWNERSHIP(teamId),
    request,
  ).then((res) => res.data);
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

const forceUnadoptSite = (siteId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.FORCE_UNADOPT_SITE(siteId),
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

const editStewardship = (
  activityId: number,
  request: ActivityRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.EDIT_STEWARDSHIP(activityId),
    request,
  ).then((res) => res.data);
};

const deleteStewardship = (siteId: number): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.DELETE_STEWARDSHIP(siteId),
  ).then((res) => res.data);
};

const getAdoptedSites = (): Promise<AdoptedSites> => {
  return AppAxiosInstance.get(ProtectedApiClientRoutes.GET_ADOPTED_SITES).then(
    (res) => res.data,
  );
};

const editSite = (siteId: number, request: EditSiteRequest): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedAdminApiRoutes.EDIT_SITE(siteId),
    request,
  ).then((res) => res.data);
};

const updateSite = (
  siteId: number,
  request: SiteEntriesRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.UPDATE_SITE(siteId),
    request,
  ).then((res) => res.data);
};

const editSiteEntry = (
  entryId: number,
  request: SiteEntriesRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedAdminApiRoutes.EDIT_SITE_ENTRY(entryId),
    request,
  ).then((res) => res.data);
};

const getAdoptionReport = (): Promise<AdoptionReport> => {
  return AppAxiosInstance.get(AdminApiClientRoutes.GET_ADOPTION_REPORT).then(
    (res) => res.data,
  );
};

const getAdoptionReportCsv = (previousDays: number | null): Promise<string> => {
  return AppAxiosInstance.get(
    `${
      previousDays
        ? ParameterizedAdminApiRoutes.GET_ADOPTION_REPORT_CSV(previousDays)
        : AdminApiClientRoutes.GET_ADOPTION_REPORT_CSV
    }`,
  ).then((res) => res.data);
};

const getStewardshipReport = (): Promise<StewardshipReport> => {
  return AppAxiosInstance.get(AdminApiClientRoutes.GET_STEWARDSHIP_REPORT).then(
    (res) => res.data,
  );
};

const getStewardshipReportCsv = (
  previousDays: number | null,
): Promise<string> => {
  return AppAxiosInstance.get(
    `${
      previousDays
        ? ParameterizedAdminApiRoutes.GET_STEWARDSHIP_REPORT_CSV(previousDays)
        : AdminApiClientRoutes.GET_STEWARDSHIP_REPORT_CSV
    }`,
  ).then((res) => res.data);
};

const addSite = (request: AddSiteRequest): Promise<void> => {
  return AppAxiosInstance.post(ProtectedApiClientRoutes.ADD_SITE, request).then(
    (res) => res.data,
  );
};

const nameSiteEntry = (
  siteId: number,
  request: NameSiteEntryRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.NAME_SITE_ENTRY(siteId),
    request,
  ).then((res) => res.data);
};

const addSites = (request: AddSitesRequest): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.ADD_SITES, request).then(
    (res) => res.data,
  );
};

const sendEmail = (request: SendEmailRequest): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.SEND_EMAIL, request).then(
    (res) => res.data,
  );
};

const deleteImage = (imageId: number): Promise<void> => {
  return AppAxiosInstance.delete(
    ParameterizedApiRoutes.DELETE_IMAGE(imageId),
  ).then((res) => res.data);
};

const filterSites = (
  params: FilterSitesParams,
): Promise<FilterSitesResponse> => {
  return AppAxiosInstance.get(
    ParameterizedAdminApiRoutes.FILTER_SITES(params),
  ).then((res) => res.data);
};

const filterSiteImages = (
  params: FilterSiteImagesParams,
): Promise<FilterSiteImagesResponse> => {
  return AppAxiosInstance.get(
    ParameterizedAdminApiRoutes.FILTER_SITE_IMAGES(params),
  ).then((res) => res.data);
};

const approveImage = (imageId: number): Promise<void> => {
  return AppAxiosInstance.put(
    ParameterizedAdminApiRoutes.APPROVE_IMAGE(imageId),
  ).then((res) => res.data);
};

const rejectImage = (imageId: number, reason: string): Promise<void> => {
  return AppAxiosInstance.delete(
    ParameterizedAdminApiRoutes.REJECT_IMAGE(imageId, reason),
  ).then((res) => res.data);
};

const uploadImage = (
  siteEntryId: number,
  imageFile: string | ArrayBuffer,
  anon: boolean,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.UPLOAD_IMAGE(siteEntryId),
    { anonymous: anon, image: imageFile },
  ).then((res) => res.data);
};

const getEmailTemplateNames = (): Promise<TemplateNamesResponse> => {
  return AppAxiosInstance.get(AdminApiClientRoutes.GET_TEMPLATE_NAMES).then(
    (res) => res.data,
  );
};

const loadEmailTemplateContent = (
  templateName: string,
): Promise<LoadTemplateResponse> => {
  return AppAxiosInstance.get(
    ParameterizedAdminApiRoutes.LOAD_TEMPLATE(templateName),
  ).then((res) => res.data);
};

const addTemplate = (request: AddTemplateRequest): Promise<void> => {
  return AppAxiosInstance.post(AdminApiClientRoutes.ADD_TEMPLATE, request).then(
    (res) => res.data,
  );
};

const reportSiteForIssues = (
  siteId: number,
  request: ReportSiteRequest,
): Promise<void> => {
  return AppAxiosInstance.post(
    ParameterizedApiRoutes.REPORT_SITE(siteId),
    request,
  ).then((res) => res.data);
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
  createChild,
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
  forceUnadoptSite,
  recordStewardship,
  editStewardship,
  deleteStewardship,
  getAdoptedSites,
  editSite,
  updateSite,
  editSiteEntry,
  getAdoptionReport,
  getAdoptionReportCsv,
  getStewardshipReport,
  getStewardshipReportCsv,
  addSite,
  nameSiteEntry,
  addSites,
  sendEmail,
  deleteImage,
  filterSites,
  filterSiteImages,
  approveImage,
  rejectImage,
  uploadImage,
  getEmailTemplateNames,
  loadEmailTemplateContent,
  addTemplate,
  reportSiteForIssues,
});

export default Client;
